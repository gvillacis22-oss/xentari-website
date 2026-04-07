"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need life insurance if I'm young and healthy?",
    answer:
      "Yes — and this is actually the best time to get it. When you're young and healthy, you lock in the lowest rates possible. Life insurance isn't just about death benefits; it can be a powerful wealth-building tool with tax advantages and cash value accumulation.",
  },
  {
    question: "How much does this cost?",
    answer:
      "It depends on your situation. The initial consultation is completely free, and I'll give you a clear picture of costs before you commit to anything. Many clients are surprised to find they can get better coverage for less than they're currently paying.",
  },
  {
    question: "Is this a consultation or a sales call?",
    answer:
      "It's a consultation — not a pitch. My goal is to understand your situation and give you real advice, whether or not you end up working with me. I don't believe in high-pressure tactics. If we're a good fit, great. If not, you'll still walk away with valuable insights.",
  },
  {
    question: "Do you work with clients nationwide?",
    answer:
      "Yes! I'm licensed in 38 states and work with clients across the country. Everything can be done remotely via video calls, phone, and secure document sharing. Location is never a barrier to getting the help you need.",
  },
];

export function FAQV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Common Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get answers to the questions we hear most often
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111113] border border-[#FF6B35]/20 rounded-xl overflow-hidden hover:border-[#FF6B35]/40 transition-all duration-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-medium pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FF6B35] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
