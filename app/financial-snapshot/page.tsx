import { Metadata } from "next";
import { FinancialSnapshotClient } from "./client";

export const metadata: Metadata = {
  title: "Financial Snapshot | Xentari",
  description:
    "Organize your financial picture with our guided worksheet. Track income, expenses, savings, debt, and identify potential opportunity areas.",
};

export default function FinancialSnapshotPage() {
  return <FinancialSnapshotClient />;
}
