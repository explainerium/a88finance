// Shared Tailwind class strings for the admin UI (keeps forms consistent).

export const card =
  "rounded-2xl border border-border/70 bg-white p-5 shadow-[0_1px_2px_rgba(11,42,74,0.04),0_14px_34px_-18px_rgba(11,42,74,0.14)]";

export const label =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-ink-3";

export const input =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-brand-ink outline-none transition-colors placeholder:text-brand-ink-3/50 focus:border-brand-gold";

export const help = "mt-1 text-xs text-brand-ink-3";
export const errorText = "mt-1 text-xs font-medium text-red-600";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export const btnPrimary = `${btn} bg-brand-gold text-brand-ink hover:bg-brand-gold-deep hover:text-white`;
export const btnGhost = `${btn} border border-border bg-white text-brand-ink hover:bg-brand-paper-2`;
export const btnDanger = `${btn} border border-red-200 bg-white text-red-600 hover:bg-red-50`;
