# A88 Finance — Page Porting Guide (for contributors/agents)

You are porting static HTML mockups into an existing Next.js 16 (App Router, React 19, TS, Tailwind v4, shadcn/ui) project. The **foundation, home page, shared chrome, and reusable sections already exist**. Match their conventions exactly. Do NOT re-create the header/footer/theme.

## Locations
- App root: `E:\Client Projects\A88 Finance\a88finance\a88finance`
- Mockups (source of truth for content & layout): `E:\Client Projects\A88 Finance\a88finance\mockups\*.html`
  - Files are large with long inline-SVG lines — **read in chunks with offset/limit**, or grep for the `<body>`/section markup. The shared `<style>`, top bar, header and footer are IDENTICAL across every mockup and are ALREADY ported — ignore them. Only port the unique `<section>`s between header and footer.
- Pages go in: `src/app/(marketing)/<route>/page.tsx` (the `(marketing)` layout already wraps every page with TopBar + Header + Footer — do NOT add them).
- Page-specific section components: `src/components/sections/<page>/*.tsx` (create the folder). Reusable ones already live in `src/components/sections/`.

## Brand & styling — REUSE, don't reinvent
All mockup CSS classes are already ported globally in `src/app/globals.css`. **Use the same class names** from the mockup and they will render correctly. Key shared classes:
- Layout: `.wrap` (max-width container), `.section-pad` (vertical padding), `.shead` (section head block), `.kicker` (gold uppercase eyebrow — put text directly inside a `<span className="kicker">`).
- Buttons: `.btn` + one of `.btn-gold`, `.btn-ink`, `.btn-ghost`, `.btn-light` (pill buttons). Use on `<Link>`/`<a>`.
- Cards/sections already styled: `.svc-grid/.svc-card/.svc-ic`, `.story-grid/.story-card/.ph/.ph-fam/.ph-mig/.ph-biz`, `.steps/.step/.num`, `.blog-grid/.bcard/.top/.body/.readmore`, `.stats/.stat`, `.contact/.ctile/.ci/.ct/.cform/.field`, `.news/.news-band/.news-form`, `.tst/.tcard`, `.hero/.hero-frame/.chip`.
- Brand color utilities (Tailwind): `bg-brand-blue text-brand-ink bg-brand-gold text-brand-gold-soft bg-brand-ink-2 bg-brand-paper-2` etc. (keys: blue, ink, ink-2, ink-3, gold, gold-soft, gold-deep, paper, paper-2). Use these for any NEW one-off styling instead of hardcoding hex.
- Fonts are global (Bricolage Grotesque for h1–h3, Hanken Grotesk for body) — don't set fonts.

## Reusable pieces you SHOULD import where the content matches
- `import { Reveal } from "@/components/shared/reveal"` — scroll-reveal wrapper (replaces the mockup's `.reveal` class). Wrap section blocks/cards. Props: `className`, `delay` (seconds), `as` ("div"|"section"|"li"|"article").
- `import { ContentIcon } from "@/components/shared/icon"` — `<ContentIcon name="car" />` (keys: car, building, user, users, shield, bike, sailboat, wrench, fileText, heartHandshake, globe, store). For other icons import from `lucide-react` directly. NOTE: lucide no longer ships brand icons — for social use `@/components/shared/social-icons` (`FacebookIcon`, `LinkedinIcon`, `InstagramIcon`).
- Whole sections you can drop in if the page repeats them (most inner pages reuse Contact + Newsletter + Process + Testimonials at the bottom):
  - `<ServicesSection />` `@/components/sections/services-section` (props: kicker,title,intro,items,cta)
  - `<StorySection />`, `<ProcessSection />`, `<TestimonialsSection />`, `<StatStrip />`
  - `<BlogSection />` `@/components/sections/blog-section`
  - `<ContactSection />` `@/components/sections/contact-section` (includes the callback LeadForm)
  - `<NewsletterSection />` `@/components/sections/newsletter-section`
- Forms: `import { LeadForm } from "@/components/forms/lead-form"`. `variant="callback"` (name/phone/type) or `variant="full"` (adds email + message). It already wires the Resend server action + validation + toasts. Use this for contact/apply page forms — do NOT build a new form or server action.
- Content data lives in `src/lib/content.ts` (services, processSteps, storyPersonas, testimonials, blogPosts, homeStats) and `src/lib/site-config.ts` (contact, hours, navItems, financeTypes). Read from these instead of hardcoding.

## Page requirements (every page)
1. `export const metadata: Metadata = { title: "<Page Title>", description: "<unique 140–160 char>", alternates: { canonical: "/<route>" } }` — title auto-gets the " | A88 Finance Group" suffix from the root layout, so just the page name.
2. Server Component by default. Only add `"use client"` to a small leaf component that needs interactivity.
3. Use `<Link>` from `next/link` for internal links; real routes are: `/ /about /services /services/personal-loans /services/business-loans /services/car-finance /blog /contact /apply /privacy`. The mockups use absolute `https://a88finance.com/...` URLs — convert them to these relative routes. "Apply Now" → `/apply`.
4. Wrap meaningful blocks in `<Reveal>` for the scroll animation (don't overdo it — section-level or card-level).
5. Add an inner-page hero. The mockups use a hero band at the top of inner pages — replicate its structure/classes from the mockup. If the inner-page hero uses classes not in globals, add a small scoped CSS-less version using Tailwind brand utilities OR add the class to `globals.css` under `@layer components` (only if genuinely shared).
6. Keep all body copy faithful to the mockup (headings, lists, CTAs, FAQ text). This is real client content.
7. For FAQ accordions, use shadcn `Accordion` from `@/components/ui/accordion`.

## Don'ts
- Don't add header/footer/topbar.
- Don't install packages or edit `globals.css` theme tokens.
- Don't hardcode the logo — it's `/logo.svg` via the shared chrome already.
- Don't invent content not in the mockup.

When done, your page should typecheck (`npx tsc --noEmit`) and visually match the mockup section-for-section.
