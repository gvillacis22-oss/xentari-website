// Site Configuration - Easy to update
export const siteConfig = {
  name: "Xentari",
  tagline: "Smarter Coverage. Strategic Planning. Financial Clarity.",
  description:
    "Xentari helps individuals, families, and business owners navigate health insurance and tax-efficient strategies with guidance you can trust since 2018.",
  url: "https://xentari.com",
  foundedYear: 2018,
};

// Contact Information
export const contactInfo = {
  phone: "(555) 555-5555",
  phoneHref: "tel:+15555555555",
  email: "hello@xentari.com",
  emailHref: "mailto:hello@xentari.com",
  location: "South Florida",
  address: "South Florida, USA",
};

// Navigation Links
export const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Individual & Family Plans", href: "/services/individual-family" },
      { label: "Business Group Benefits", href: "/services/business-benefits" },
      { label: "Tax Structuring", href: "/services/tax-structuring" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

// Footer Navigation
export const footerLinks = {
  services: [
    { label: "Individual Plans", href: "/services/individual-family" },
    { label: "Family Plans", href: "/services/individual-family" },
    { label: "Business Benefits", href: "/services/business-benefits" },
    { label: "Tax Structuring", href: "/services/tax-structuring" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

// Social Links
export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
];

// Trust Stats
export const trustStats = [
  { value: "7+", label: "Years Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "$10M+", label: "Coverage Placed" },
  { value: "98%", label: "Client Retention" },
];

// Services Data
export const services = [
  {
    id: "individual-family",
    title: "Individual & Family Plans",
    shortTitle: "Individual & Family",
    description:
      "Find the right health coverage for you and your loved ones. We simplify your options and find plans that fit your needs and budget.",
    icon: "shield",
    href: "/services/individual-family",
    features: [
      "Personalized plan comparison",
      "ACA marketplace navigation",
      "Short-term health options",
      "Dental & vision coverage",
      "Prescription drug analysis",
    ],
  },
  {
    id: "business-benefits",
    title: "Business Group Benefits",
    shortTitle: "Business Benefits",
    description:
      "Attract and retain talent with competitive employee benefits. We design group health plans that work for your business.",
    icon: "building",
    href: "/services/business-benefits",
    features: [
      "Group health insurance",
      "Employee benefits packages",
      "Cost containment strategies",
      "Compliance guidance",
      "Open enrollment support",
    ],
  },
  {
    id: "tax-structuring",
    title: "Tax Structuring",
    shortTitle: "Tax Structuring",
    description:
      "Optimize your financial position with strategic tax planning. Reduce liability and keep more of what you earn.",
    icon: "chart",
    href: "/services/tax-structuring",
    features: [
      "Tax-efficient strategies",
      "Business structure optimization",
      "Retirement planning",
      "Wealth preservation",
      "Entity selection guidance",
    ],
  },
];

// Audience Segments
export const audiences = [
  {
    id: "individuals",
    title: "Individuals",
    description:
      "Navigating health insurance alone can feel overwhelming. We cut through the noise and find coverage that actually fits—your health, your budget, your life.",
    detail:
      "Whether you're self-employed, between jobs, or just want better options, we guide you to the right plan without the confusion.",
  },
  {
    id: "families",
    title: "Families",
    description:
      "Your family's health is everything. From newborns to aging parents, we help you find comprehensive coverage that gives you peace of mind at every stage of life.",
    detail:
      "We look at the full picture—pediatric care, maternity, specialists, prescriptions—and build a plan around your family's real needs.",
  },
  {
    id: "business-owners",
    title: "Business Owners",
    description:
      "Your employees are your greatest asset. We build benefits packages that attract talent, reduce costs, and simplify administration.",
    detail:
      "From startups to growing companies, we design group health plans and employee benefits that scale with your business.",
  },
];

// Why Choose Us Features
export const features = [
  {
    title: "Advisor-First Approach",
    description:
      "We're not salespeople pushing products. We're strategists who take time to understand your situation before recommending anything. Your goals drive our guidance.",
    icon: "users",
  },
  {
    title: "Experience Since 2018",
    description:
      "We've helped hundreds of clients through changing markets, new regulations, and every life stage in between. We've seen it all—and we know how to navigate it.",
    icon: "award",
  },
  {
    title: "Dual Expertise",
    description:
      "Most agents do insurance OR tax planning. We connect both disciplines to create smarter financial outcomes—protecting you while positioning you for growth.",
    icon: "layers",
  },
  {
    title: "Long-Term Partnership",
    description:
      "We don't disappear after enrollment. We're here year after year to adjust your coverage, optimize your strategy, and answer your questions.",
    icon: "handshake",
  },
];

// Process Steps
export const processSteps = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "We start with a conversation. Tell us about your situation, goals, and concerns. No pressure, no obligation—just a clear starting point.",
  },
  {
    step: 2,
    title: "Custom Strategy",
    description:
      "We analyze your options across carriers and strategies. Then we present a clear, tailored plan—whether it's coverage, benefits, or tax positioning.",
  },
  {
    step: 3,
    title: "Ongoing Support",
    description:
      "We handle the details and answer every question. As your needs evolve, we adjust your strategy. We're in this with you for the long term.",
  },
];

// Testimonials
export const testimonials = [
  {
    quote:
      "They took something I dreaded—choosing health insurance—and made it actually simple. I finally feel like I have the right coverage for the first time in years.",
    author: "Sarah M.",
    role: "Self-Employed Consultant",
  },
  {
    quote:
      "Our company was overpaying for employee benefits. They restructured our entire plan and saved us 20% while actually improving coverage. Highly recommend.",
    author: "James T.",
    role: "CEO, Tech Startup",
  },
  {
    quote:
      "The tax structuring advice alone was worth it. I didn't know these options even existed. They've saved me thousands—and I'm keeping more of what I earn.",
    author: "Michael R.",
    role: "Real Estate Investor",
  },
];

// FAQ Items
export const faqItems = [
  {
    question: "How much does a consultation cost?",
    answer:
      "Your initial consultation is completely free. We believe in earning your trust before you commit to anything. There's no obligation—just an honest conversation about your situation.",
  },
  {
    question: "Do you work with all insurance carriers?",
    answer:
      "Yes. We're fully independent, which means we're not tied to any single carrier. We shop the entire market to find the best options for your specific situation.",
  },
  {
    question: "How is tax structuring different from tax preparation?",
    answer:
      "Tax preparation looks backward at last year. Tax structuring looks forward—positioning your finances today to minimize future liability. It's proactive, not reactive.",
  },
  {
    question: "What if my needs change over time?",
    answer:
      "We're here for the long haul. As your life, family, or business evolves, we adjust your coverage and strategy accordingly. You'll never have to start over with someone new.",
  },
  {
    question: "How long does it take to get coverage?",
    answer:
      "Depending on the type of coverage, you could be enrolled within days. We handle the paperwork and guide you through every step to make the process as fast and smooth as possible.",
  },
  {
    question: "Do you help with Medicare and retirement planning?",
    answer:
      "Yes, we help clients transition to Medicare and coordinate retirement benefits. We ensure your coverage continues seamlessly as your situation changes.",
  },
];

// Coverage Types for Form
export const coverageTypes = [
  { value: "individual", label: "Individual Health Insurance" },
  { value: "family", label: "Family Health Insurance" },
  { value: "group", label: "Business Group Benefits" },
  { value: "tax", label: "Tax Structuring" },
  { value: "other", label: "Other / Not Sure" },
];
