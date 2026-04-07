import { AdvancedCalculator } from "@/components/v2";

export const metadata = {
  title: "Retirement Calculator | Xentari",
  description:
    "Estimate your future and see what it may take to reach your retirement goals with our interactive calculator.",
};

export default function CalculatorPage() {
  return (
    <main className="pt-20">
      <AdvancedCalculator />
    </main>
  );
}
