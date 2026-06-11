"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateSettingsAction } from "@/lib/actions/settings";
import { initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/dashboard/submit-button";
import { card, errorText } from "@/components/dashboard/classes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type SettingsValues = {
  siteName: string;
  siteDescription: string;
  defaultOgImage: string;
  contactEmail: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
};

export function SettingsForm({ settings }: { settings: SettingsValues }) {
  const [state, formAction] = useActionState(
    updateSettingsAction,
    initialFormState,
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state?.ok) toast.success("Settings saved.");
  }, [state]);

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className={`${card} space-y-4`}>
        <h2 className="font-display text-base font-semibold text-brand-ink">
          General
        </h2>
        <div className="space-y-1.5">
          <Label htmlFor="siteName">Site name</Label>
          <Input
            id="siteName"
            name="siteName"
            defaultValue={settings.siteName}
            required
          />
          {fieldError("siteName") && (
            <p className={errorText}>{fieldError("siteName")}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="siteDescription">Site description</Label>
          <Textarea
            id="siteDescription"
            name="siteDescription"
            defaultValue={settings.siteDescription}
            rows={3}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="defaultOgImage">Default OG image URL</Label>
          <Input
            id="defaultOgImage"
            name="defaultOgImage"
            defaultValue={settings.defaultOgImage}
            placeholder="/og-default.png"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactEmail">Contact email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={settings.contactEmail}
            placeholder="info@a88finance.com"
          />
          {fieldError("contactEmail") && (
            <p className={errorText}>{fieldError("contactEmail")}</p>
          )}
        </div>
      </div>

      <div className={`${card} space-y-4`}>
        <h2 className="font-display text-base font-semibold text-brand-ink">
          Social links
        </h2>
        <div className="space-y-1.5">
          <Label htmlFor="facebookUrl">Facebook</Label>
          <Input
            id="facebookUrl"
            name="facebookUrl"
            defaultValue={settings.facebookUrl}
            placeholder="https://facebook.com/…"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="linkedinUrl">LinkedIn</Label>
          <Input
            id="linkedinUrl"
            name="linkedinUrl"
            defaultValue={settings.linkedinUrl}
            placeholder="https://linkedin.com/company/…"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="instagramUrl">Instagram</Label>
          <Input
            id="instagramUrl"
            name="instagramUrl"
            defaultValue={settings.instagramUrl}
            placeholder="https://instagram.com/…"
          />
        </div>
      </div>

      <SubmitButton>Save settings</SubmitButton>
    </form>
  );
}
