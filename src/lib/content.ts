/**
 * Shared marketing content. Centralised so pages and the (future) blog
 * dashboard can read from one source of truth.
 */

export type Service = {
  title: string;
  description: string;
  icon: string; // lucide icon key, resolved in the rendering component
  href?: string;
};

export const services: Service[] = [
  {
    title: "Vehicle Finance",
    description:
      "Compare car, motorbike, caravan, and recreational vehicle finance with fast pre-approvals and clear guidance.",
    icon: "car",
    href: "/services/car-finance",
  },
  {
    title: "Business Finance",
    description:
      "Loans for equipment, vehicles, cashflow, and growth, including low-doc and asset finance options.",
    icon: "building",
    href: "/services/business-loans",
  },
  {
    title: "Personal Loans",
    description:
      "Simple personal loans for weddings, renovations, holidays, or when you just need extra cash.",
    icon: "user",
    href: "/services/personal-loans",
  },
  {
    title: "Specialty Finance",
    description:
      "Supportive options for bad credit, ex-bankruptcy, ATO debt, and low-income clients.",
    icon: "shield",
  },
  {
    title: "Car & Motorbike Loans",
    description:
      "Fast, flexible loans for new or used cars and motorbikes, with simple pre-approvals and competitive rates.",
    icon: "bike",
  },
  {
    title: "Jetski, Boat & Caravan Loans",
    description:
      "Finance options for boats, caravans, jet skis, and recreational vehicles so you can enjoy the lifestyle you want.",
    icon: "sailboat",
  },
  {
    title: "Business & Equipment Finance",
    description:
      "Support for small businesses needing vehicles, tools, machinery, or cash flow solutions.",
    icon: "wrench",
  },
  {
    title: "Low-Doc & Self-Employed Loans",
    description:
      "Flexible loan options designed for freelancers, contractors, and business owners without full financials.",
    icon: "fileText",
  },
  {
    title: "Bad Credit & Ex-Bankruptcy Loans",
    description:
      "Supportive finance solutions for clients rebuilding after credit issues, low income, or past bankruptcy.",
    icon: "heartHandshake",
  },
];

export const processSteps = [
  { title: "Enquire", text: "Simple conversation to understand your needs." },
  { title: "Compare", text: "I review lenders and find your best options." },
  { title: "Apply", text: "Pre-approval completed in minutes." },
  { title: "Settle", text: "Drive away or move forward with confidence." },
];

export type StoryPersona = {
  title: string;
  text: string;
  icon: string;
  variant: "fam" | "mig" | "biz";
  image: string;
};

export const storyPersonas: StoryPersona[] = [
  {
    title: "Families & Single Parents",
    text: "Reliable, affordable loan options designed to support everyday family needs, from upgrading your car to handling unexpected expenses. I'm here to make the process simple and stress-free, no matter your situation.",
    icon: "users",
    variant: "fam",
    image: "/services/families.jpg",
  },
  {
    title: "Migrants & Visa Holders",
    text: "Starting a new life in Australia comes with challenges. I offer friendly, flexible finance solutions for migrants who may not have long credit histories. Clear guidance, no pressure, and real support, every step of the way.",
    icon: "globe",
    variant: "mig",
    image: "/services/migrants.webp",
  },
  {
    title: "Business & Self-Employed",
    text: "Whether you're a tradie, freelancer, or running a growing business, you need finance that works the way you do. I help you access low-doc loans, vehicles, tools, and equipment, fast, simple, and tailored to your cash flow.",
    icon: "store",
    variant: "biz",
    image: "/services/business.jpg",
  },
];

export type Testimonial = {
  name: string;
  initials: string;
  gold?: boolean;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "M Stevenson",
    initials: "MS",
    quote:
      "Jess was fantastic during the whole process. She kept me well informed and patiently answered my questions to help me understand what was happening. She was diligent and made sure that any issues were addressed immediately. Friendly and professional, she made a sometimes daunting process a little simpler. Thanks Jess and team.",
  },
  {
    name: "L Wilson",
    initials: "LW",
    gold: true,
    quote:
      "Jess and the team were very helpful in securing finance for my new car. She went above and beyond and answered all my questions in a professional and friendly manner. I will definitely be recommending her services to friends and family.",
  },
  {
    name: "N Potter",
    initials: "NP",
    quote:
      "Jess was a dream to deal with and made the whole process real easy. A big thank you for getting me in my new car.",
  },
  {
    name: "L Trinh",
    initials: "LT",
    gold: true,
    quote:
      "I highly recommend Jessica for anyone who needs a business car loan. She was professional and understood my needs. I am grateful for her assistance and look forward to working with her in the future.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  excerpt: string;
  gradient?: "g2" | "g3";
  coverImage?: string;
  coverImageAlt?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "five-signs-ready-for-business-loan",
    title: "Five Signs You're Ready for a Business Loan",
    category: "Business",
    categoryIcon: "building",
    excerpt:
      "Securing a business loan is a significant decision. Rather than applying whenever you think you might need it, look for these signs first.",
  },
  {
    slug: "should-you-refinance-your-car-loan",
    title: "Should You Refinance Your Current Car Loan?",
    category: "Car Finance",
    categoryIcon: "car",
    excerpt:
      "Refinancing a car loan means replacing your current loan with a new one, typically to reduce your interest rate or repayments.",
    gradient: "g2",
  },
  {
    slug: "bad-credit-doesnt-mean-no-options",
    title: "Bad Credit Doesn't Mean No Options",
    category: "Credit",
    categoryIcon: "shield",
    excerpt:
      "A poor credit history can feel like a permanent limitation, but it's not a life sentence. Here is what you can do next.",
    gradient: "g3",
  },
];

export const homeStats = [
  { value: "20+", label: "Years Experience" },
  { value: "Fast", label: "Pre-Approvals" },
  { value: "1:1", label: "Personal Support" },
  { value: "25+", label: "Lenders" },
];
