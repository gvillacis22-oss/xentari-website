import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/constants";

interface FAQProps {
  showAll?: boolean;
  limit?: number;
}

export function FAQ({ showAll = false, limit = 4 }: FAQProps) {
  const displayItems = showAll ? faqItems : faqItems.slice(0, limit);

  return (
    <section className="section-padding bg-background-subtle">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            Common Questions
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Have questions? We have answers. Here are some of the most common
            questions we receive.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion items={displayItems} />
        </div>

        {/* Link to full FAQ */}
        {!showAll && (
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
            >
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
