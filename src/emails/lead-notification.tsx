import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { LeadInput } from "@/lib/schemas";

type LeadNotificationProps = LeadInput & { submittedAt: string };

const brand = { ink: "#0b2a4a", blue: "#0166be", gold: "#ed9732", muted: "#5b6b80" };

export function LeadNotification({
  name,
  phone,
  email,
  financeType,
  message,
  submittedAt,
}: LeadNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New finance enquiry from {name} — {financeType}
      </Preview>
      <Body style={{ backgroundColor: "#f7fafc", fontFamily: "Arial, sans-serif", margin: 0, padding: "24px" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: "12px", maxWidth: "560px", overflow: "hidden", border: "1px solid #e5eaf0" }}>
          <Section style={{ backgroundColor: brand.ink, padding: "24px 32px" }}>
            <Heading style={{ color: "#ffffff", fontSize: "20px", margin: 0 }}>
              New Finance Enquiry
            </Heading>
            <Text style={{ color: "#aebbd0", fontSize: "13px", margin: "6px 0 0" }}>
              A88 Finance Group website
            </Text>
          </Section>

          <Section style={{ padding: "28px 32px" }}>
            <Row label="Name" value={name} />
            <Row label="Phone" value={phone} />
            {email ? <Row label="Email" value={email} /> : null}
            <Row label="Finance type" value={financeType} />
            {message ? <Row label="Message" value={message} /> : null}
            <Hr style={{ borderColor: "#e5eaf0", margin: "20px 0" }} />
            <Text style={{ color: brand.muted, fontSize: "12px", margin: 0 }}>
              Submitted {submittedAt}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ marginBottom: "14px" }}>
      <Text style={{ color: brand.gold, fontSize: "11px", fontWeight: "bold", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
        {label}
      </Text>
      <Text style={{ color: brand.ink, fontSize: "15px", margin: 0, whiteSpace: "pre-wrap" }}>
        {value}
      </Text>
    </Section>
  );
}

export default LeadNotification;
