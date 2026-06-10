import type { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceDetailContent,
} from "@/components/sections/service-detail/service-detail-page";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Personal Loans",
  description:
    "Simple personal loans for weddings, renovations, holidays, debt consolidation and more. Compare 25+ lenders for competitive rates and repayments that fit your budget.",
  alternates: { canonical: "/services/personal-loans" },
};

const content: ServiceDetailContent = {
  crumbLabel: "Personal Loans",
  heroTitle: "Personal Loans",
  heroIntro:
    "Simple personal loans for the moments that matter, from weddings and renovations to holidays or simply needing a little extra.",
  kicker: "Personal Loans",
  introHeading: "Personal Loans",
  introParagraphs: [
    "Whatever you are planning, a personal loan can give you the breathing room to do it on your terms. We compare lenders to find competitive rates and repayments that fit your budget.",
    "Clear guidance, honest advice, and a quick, straightforward process from enquiry to settlement.",
  ],
  visualIcon: (
    <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 7a5 5 0 0 1 9.5 5C19 16.5 12 21 12 21z" />
  ),
  visualImage: "/services/personal.webp",
  features: [
    {
      icon: (
        <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 7a5 5 0 0 1 9.5 5C19 16.5 12 21 12 21z" />
      ),
      title: "Weddings & events",
      text: "Cover the cost of your big day without the stress of dipping into savings.",
    },
    {
      icon: <path d="M3 11l9-7 9 7M5 10v10h14V10" />,
      title: "Home renovations",
      text: "Fund the upgrade, extension, or fix-up your home has been waiting for.",
    },
    {
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </>
      ),
      title: "Holidays & travel",
      text: "Spread the cost of that trip into manageable, predictable repayments.",
    },
    {
      icon: <path d="M21 12a9 9 0 1 1-3-6.7L21 7M21 3v4h-4" />,
      title: "Debt consolidation",
      text: "Roll multiple repayments into one simpler payment, often at a better rate.",
    },
    {
      icon: (
        <>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
      title: "Extra cash when needed",
      text: "A flexible option for unexpected expenses or bridging a short-term gap.",
    },
    {
      icon: (
        <>
          <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </>
      ),
      title: "Major purchases",
      text: "Finance the things you need now and pay them off over a comfortable term.",
    },
  ],
  faqs: [
    {
      question: "How much can I borrow?",
      answer:
        "It depends on your income, expenses, and credit profile. We assess your situation and match you with lenders whose limits and criteria suit your needs.",
    },
    {
      question: "Will applying affect my credit score?",
      answer:
        "We talk through your options first and only proceed to a formal application when you are ready, so there are no surprises.",
    },
    {
      question: "How long does it take?",
      answer:
        "Pre-approval can often be completed quickly. Final timing depends on the lender and how fast supporting documents are provided.",
    },
    {
      question: "Can I get a personal loan with bad credit?",
      answer:
        "Possibly. We work with lenders who consider a range of situations, including credit rebuilding. Have a chat with us and we will be honest about your options.",
    },
  ],
};

export default function PersonalLoansPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Personal Loans", path: "/services/personal-loans" },
        ])}
      />
      <ServiceDetailPage content={content} />
    </>
  );
}
