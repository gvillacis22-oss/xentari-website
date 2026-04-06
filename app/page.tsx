import {
  HeroV2,
  TrustBarV2,
  StrategyPillarsV2,
  AdvancedCalculator,
  ServicesDetailV2,
  WhyChooseUsV2,
  ProcessV2,
  TestimonialsV2,
  CTAV2,
} from "@/components/v2";

export const metadata = {
  title: "Xentari | Smarter Coverage. Strategic Planning. Financial Clarity.",
  description:
    "Premium financial guidance for individuals, families, and business owners. Health coverage, tax optimization, and wealth building.",
};

export default function HomePage() {
  return (
    <>
      <HeroV2 />
      <TrustBarV2 />
      <StrategyPillarsV2 />
      <ServicesDetailV2 />
      <AdvancedCalculator />
      <WhyChooseUsV2 />
      <ProcessV2 />
      <TestimonialsV2 />
      <CTAV2 />
    </>
  );
}
