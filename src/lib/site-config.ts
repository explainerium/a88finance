export const siteConfig = {
  name: "A88 Finance Group",
  title: "A88 Finance Group | Real Finance Solutions from Someone Who Gets It",
  description:
    "Personal, business, and car loan solutions tailored for everyday Australians, delivered with clarity, honesty, and a no-judgment approach.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://a88finance.com",
  keywords: [
    "finance broker",
    "personal loans",
    "business loans",
    "car finance",
    "bad credit loans",
    "Melbourne finance broker",
    "low doc loans",
    "vehicle finance Australia",
  ],
  contact: {
    phone: "0499 785 992",
    phoneHref: "tel:0499785992",
    email: "info@a88finance.com",
    emailHref: "mailto:info@a88finance.com",
    addressMain: "Office 3752, 470 St Kilda Road, Melbourne, VIC 3004",
    addressSecondary: "Thornhill Park VIC 3335",
  },
  socials: {
    facebook: "https://facebook.com/a88finance",
    linkedin: "https://linkedin.com/company/a88finance",
    instagram: "https://instagram.com/a88finance",
  },
  hours: [
    { day: "Monday", time: "09:30 - 17:00" },
    { day: "Tuesday", time: "09:30 - 17:00" },
    { day: "Wednesday", time: "09:30 - 17:00" },
    { day: "Thursday", time: "09:30 - 17:00" },
    { day: "Friday", time: "09:30 - 17:00" },
    { day: "Weekend", time: "Closed" },
  ],
  legal: {
    entity: "A88 Finance Group Pty Ltd",
    creditRep: "Credit Representative 572530",
    acl: "Australian Credit Licence Number: 549146",
    abn: "ABN 66 673 606 614",
    membership: "FBAA member",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description: string;
    icon: string;
  }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Personal Loans",
        href: "/services/personal-loans",
        description: "Weddings, renovations, holidays and more",
        icon: "user",
      },
      {
        label: "Business Loans",
        href: "/services/business-loans",
        description: "Equipment, vehicles, cashflow and growth",
        icon: "building",
      },
      {
        label: "Car Finance",
        href: "/services/car-finance",
        description: "New or used cars and motorbikes, fast approval",
        icon: "car",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const financeTypes = [
  "Car & Vehicle Finance",
  "Personal Loan",
  "Business Finance",
  "Specialty / Bad Credit",
  "Not sure yet",
] as const;
