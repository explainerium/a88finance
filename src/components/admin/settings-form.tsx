"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateSettingsAction } from "@/lib/actions/settings";
import { initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/admin/submit-button";
import { card, errorText, input, label } from "@/components/admin/classes";

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
        <div>
          <label htmlFor="siteName" className={label}>
            Site name
          </label>
          <input
            id="siteName"
            name="siteName"
            defaultValue={settings.siteName}
            required
            className={input}
          />
          {fieldError("siteName") && (
            <p className={errorText}>{fieldError("siteName")}</p>
          )}
        </div>
        <div>
          <label htmlFor="siteDescription" className={label}>
            Site description
          </label>
          <textarea
            id="siteDescription"
            name="siteDescription"
            defaultValue={settings.siteDescription}
            rows={3}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="defaultOgImage" className={label}>
            Default OG image URL
          </label>
          <input
            id="defaultOgImage"
            name="defaultOgImage"
            defaultValue={settings.defaultOgImage}
            className={input}
            placeholder="/og-default.png"
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className={label}>
            Contact email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={settings.contactEmail}
            className={input}
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
        <div>
          <label htmlFor="facebookUrl" className={label}>
            Facebook
          </label>
          <input
            id="facebookUrl"
            name="facebookUrl"
            defaultValue={settings.facebookUrl}
            className={input}
            placeholder="https://facebook.com/…"
          />
        </div>
        <div>
          <label htmlFor="linkedinUrl" className={label}>
            LinkedIn
          </label>
          <input
            id="linkedinUrl"
            name="linkedinUrl"
            defaultValue={settings.linkedinUrl}
            className={input}
            placeholder="https://linkedin.com/company/…"
          />
        </div>
        <div>
          <label htmlFor="instagramUrl" className={label}>
            Instagram
          </label>
          <input
            id="instagramUrl"
            name="instagramUrl"
            defaultValue={settings.instagramUrl}
            className={input}
            placeholder="https://instagram.com/…"
          />
        </div>
      </div>

      <SubmitButton>Save settings</SubmitButton>
    </form>
  );
}
