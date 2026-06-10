export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const initialFormState: FormState = { ok: false };

/** Read a trimmed string field (empty string if absent). */
export function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Read a checkbox/boolean field. */
export function bool(formData: FormData, key: string): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}

/** Read a repeated field as a string array. */
export function list(formData: FormData, key: string): string[] {
  return formData
    .getAll(key)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
}

/** Convert an empty string to null (for optional DB columns). */
export function nullable(value: string): string | null {
  return value.length > 0 ? value : null;
}
