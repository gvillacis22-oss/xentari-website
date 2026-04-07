"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need life insurance?",
    answer: "It depends on your situation. If anyone relies on your income — family, business partners, etc. — life insurance protects them if something happens to you. We'll help you figure out if and how much you need.",
  },
  {
    question: "How much does this cost?",
    answer: "Our consultations are free. We get paid by the insurance carriers when you decide to move forward, so there's no cost to you for our guidance and recommendations.",
  },
  {
    question: "Is this a consultation or a sales call?",
    answer: "It's a real consultation. We ask questions, listen to your situation, and give you honest advice — even if that means telling you that you don't need anything right now.",
  },
  {
    question: "Do you work nationwide?",
    answer: "Yes. We're licensed in 38 states and help clients across the country with health, life, and financial planning strategies.",
  },
];

export function FAQV3() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Quick answers to common questions
          </p>
        </div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FF6B35] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View Full FAQ link */}
        <div className="text-center mt-8">
          <a
            href="/faq"
            className="text-[#FF6B35] font-medium hover:text-[#FF8B5A] transition-colors"
          >
            View Full FAQ →
          </a>
        </div>
      </div>
    </section>
  );
}
