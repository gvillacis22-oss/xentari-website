import {
  HeroV3,
  TrustBarV3,
  WhoWeHelpV3,
  ServicesV3,
  MoneySystemV3,
  ToolsV3,
  AboutV3,
  TestimonialsV3,
  FAQV3,
  FinalCTAV3,
} from "@/components/v3";
import { AdvancedCalculator } from "@/components/v2";

export const metadata = {
  title: "Xentari | Stop Overpaying. Start Building Real Wealth.",
  description:
    "We help individuals, families, and business owners take control of their money through smarter health, life, and tax strategies.",
};

export default function V3HomePage() {
  return (
    <>
      <HeroV3 />
      <TrustBarV3 />
      <WhoWeHelpV3 />
      <ServicesV3 />
      <MoneySystemV3 />
      <ToolsV3 />
      <AdvancedCalculator />
      <AboutV3 />
      <TestimonialsV3 />
      <FAQV3 />
      <FinalCTAV3 />
    </>
  );
}
