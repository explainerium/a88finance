/**
 * Renders a JSON-LD <script> for structured data (rich results / SEO).
 * Server component — safe to embed the serialised object directly.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
