import { IULCalculator } from "@/components/v2";

export const metadata = {
  title: "IUL Distribution Calculator | Xentari",
  description:
    "Calculate how early distributions from your IUL affect your retirement balance. See the impact of withdrawals on compounding growth.",
};

export default function IULCalculatorPage() {
  return (
    <main className="pt-20">
      <IULCalculator />
    </main>
  );
}
