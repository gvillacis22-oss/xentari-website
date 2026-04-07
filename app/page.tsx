import {
  HeroV2,
  TrustBarV2,
  WhoWeHelpV2,
  ServicesGridV2,
  TestimonialsV2,
  CTAV2,
} from "@/components/v2";

export const metadata = {
  title: "Xentari | Stop Overpaying. Start Building Real Wealth.",
  description:
    "Premium financial guidance for individuals, families, and business owners. Health coverage, tax optimization, and wealth building.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero - Instant clarity on what we do */}
      <HeroV2 />

      {/* Trust Bar - Credibility signals */}
      <TrustBarV2 />

      {/* Who We Help - Route users to relevant services */}
      <WhoWeHelpV2 />

      {/* Services - Clear offerings */}
      <ServicesGridV2 />

      {/* Testimonials - Social proof */}
      <TestimonialsV2 />

      {/* Final CTA - Drive action */}
      <CTAV2 />
    </>
  );
}
