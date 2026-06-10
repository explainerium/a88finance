import type { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceDetailContent,
} from "@/components/sections/service-detail/service-detail-page";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Car Finance",
  description:
    "Fast, flexible car and vehicle finance for new and used cars, motorbikes, boats and caravans. Get pre-approved with competitive rates and shop with confidence as a cash buyer.",
  alternates: { canonical: "/services/car-finance" },
};

const content: ServiceDetailContent = {
  crumbLabel: "Car Finance",
  heroTitle: "Car & Vehicle Finance",
  heroIntro:
    "Fast, flexible finance for new and used cars, motorbikes, and recreational vehicles, with simple pre-approvals and competitive rates.",
  kicker: "Car & Vehicle Finance",
  introHeading: "Car & Vehicle Finance",
  introParagraphs: [
    "Buying from a dealer or a private seller, upgrading, or refinancing an existing loan, we compare lenders to find a deal that suits your budget and gets you moving sooner.",
    "Get pre-approved so you can shop with confidence and negotiate like a cash buyer.",
  ],
  visualIcon: (
    <>
      <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  visualImage: "/services/car.png",
  features: [
    {
      icon: (
        <>
          <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </>
      ),
      title: "New & used cars",
      text: "Finance for dealer or private purchases, new or pre-loved.",
    },
    {
      icon: (
        <>
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M6 17l4-7h4l2 4M10 10L8 7H6" />
        </>
      ),
      title: "Motorbikes",
      text: "Flexible loans for road and recreational bikes.",
    },
    {
      icon: <path d="M21 12a9 9 0 1 1-3-6.7L21 7M21 3v4h-4" />,
      title: "Refinancing",
      text: "Replace your current car loan to reduce your rate or repayments.",
    },
    {
      icon: <path d="M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M5 17l2-8h6l3 5M8 9V6h3" />,
      title: "Boats, caravans & jet skis",
      text: "Finance the lifestyle, from caravans to watercraft.",
    },
    {
      icon: (
        <>
          <path d="M3 16V6h11v10M14 9h4l3 4v3h-2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </>
      ),
      title: "Utes & light commercial",
      text: "Vehicle finance for work and business needs.",
    },
    {
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      ),
      title: "Fast pre-approval",
      text: "Know your budget before you shop, with quick turnarounds.",
    },
  ],
  faqs: [
    {
      question: "Should I get pre-approved before I shop?",
      answer:
        "Yes. Pre-approval tells you your budget and lets you negotiate as a confident buyer, which can save you time and money.",
    },
    {
      question: "Can I finance a private sale?",
      answer:
        "Many lenders allow private-sale purchases. We will match you with one that does and explain any extra steps.",
    },
    {
      question: "Is refinancing my car loan worth it?",
      answer:
        "It can be, if it lowers your rate or repayments. We will compare your current loan against available options so you can decide.",
    },
    {
      question: "What rate will I get?",
      answer:
        "Rates depend on the vehicle, loan term, and your profile. We compare lenders to find the most competitive option for your situation.",
    },
  ],
};

export default function CarFinancePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Car Finance", path: "/services/car-finance" },
        ])}
      />
      <ServiceDetailPage content={content} />
    </>
  );
}
