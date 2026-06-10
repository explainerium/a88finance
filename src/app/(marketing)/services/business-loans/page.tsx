import type { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceDetailContent,
} from "@/components/sections/service-detail/service-detail-page";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Business Loans",
  description:
    "Business finance built around the way your business works, from equipment, vehicles and asset finance to cashflow funding, low-doc loans and growth funding for Australian businesses.",
  alternates: { canonical: "/services/business-loans" },
};

const content: ServiceDetailContent = {
  crumbLabel: "Business Loans",
  heroTitle: "Business Loans",
  heroIntro:
    "Finance built around the way your business actually works, from equipment and vehicles to cashflow and growth.",
  kicker: "Business Loans",
  introHeading: "Business Loans",
  introParagraphs: [
    "Whether you are a tradie, a freelancer, or running a growing company, we help you access the right finance without the runaround, including low-doc and asset finance options.",
    "We understand business owners are busy, so we keep the process simple and tailored to your cashflow.",
  ],
  visualIcon: (
    <>
      <path d="M3 16V6h11v10M14 9h4l3 4v3h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  visualImage: "/services/business.jpg",
  features: [
    {
      icon: (
        <>
          <path d="M3 16V6h11v10M14 9h4l3 4v3h-2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </>
      ),
      title: "Equipment & machinery",
      text: "Finance the tools, plant, and machinery that keep your business moving.",
    },
    {
      icon: (
        <>
          <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </>
      ),
      title: "Business vehicles",
      text: "Cars, utes, vans, and fleet finance with options to suit your structure.",
    },
    {
      icon: (
        <>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
      title: "Cashflow funding",
      text: "Bridge gaps and manage seasonal swings with flexible working-capital options.",
    },
    {
      icon: (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h6" />
        </>
      ),
      title: "Low-doc loans",
      text: "Designed for self-employed clients without full financials on hand.",
    },
    {
      icon: <path d="M3 21h18M5 21V10M19 21V10M5 10l7-5 7 5M9 21v-6h6v6" />,
      title: "Asset finance",
      text: "Spread the cost of major assets while keeping cash in the business.",
    },
    {
      icon: <path d="M3 11l9-7 9 7M5 10v10h14V10" />,
      title: "Growth & expansion",
      text: "Funding to help you take on the next premises, project, or opportunity.",
    },
  ],
  faqs: [
    {
      question: "What is a low-doc business loan?",
      answer:
        "It is a loan designed for self-employed borrowers who may not have full financial statements ready. We work with lenders who accept alternative forms of income verification.",
    },
    {
      question: "Can a new business get finance?",
      answer:
        "Some lenders support newer businesses, especially for asset and equipment finance. We will assess your situation and set realistic expectations.",
    },
    {
      question: "Do you help with ATO debt?",
      answer:
        "Yes, we have specialty options for businesses managing ATO debt. Reach out for an honest conversation about what may be possible.",
    },
    {
      question: "What documents will I need?",
      answer:
        "It varies by lender and loan type. We will give you a simple checklist up front so nothing slows the process down.",
    },
  ],
};

export default function BusinessLoansPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Business Loans", path: "/services/business-loans" },
        ])}
      />
      <ServiceDetailPage content={content} />
    </>
  );
}
