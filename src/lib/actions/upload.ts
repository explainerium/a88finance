"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export type UploadResult = { url?: string; error?: string };

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/**
 * Upload an image to Cloudinary from the admin editor / cover-image picker.
 * Auth-gated (any signed-in author/admin) and validated server-side.
 */
export async function uploadImageAction(
  formData: FormData,
): Promise<UploadResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated." };

  if (!isCloudinaryConfigured()) {
    return {
      error:
        "Image uploads aren't configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
    };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be under 8 MB." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "a88-blog", resource_type: "image" },
          (error, res) => {
            if (error || !res) reject(error ?? new Error("No response"));
            else resolve(res as { secure_url: string });
          },
        );
        stream.end(buffer);
      },
    );
    return { url: result.secure_url };
  } catch (error) {
    console.error("[uploadImage]", error);
    return { error: "Upload failed. Please try again." };
  }
}
