"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { contactInfo } from "@/lib/constants";

export function CTAV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-[#0F0F11] py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative bg-[#0A0A0B] border border-[#FF6B35]/20 rounded-3xl overflow-hidden hover:border-[#FF6B35]/40 transition-all duration-300"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent" />

            <div className="p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Copy */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Take Control of Your Money?
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Book a free consultation and let's build your financial system together.
                    No pressure, no obligations — just real advice.
                  </p>

                  {/* Primary CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      Book Your Free Consultation
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href={contactInfo.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/20 hover:border-[#FF6B35]/50 text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </div>
                </motion.div>

                {/* Right side - Contact options */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4"
                >
                  {/* Phone */}
                  <a
                    href={contactInfo.phoneHref}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#111113] border border-[#FF6B35]/20 hover:border-[#FF6B35]/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Call Us
                      </div>
                      <div className="text-white font-medium">
                        {contactInfo.phone}
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={contactInfo.emailHref}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#111113] border border-[#FF6B35]/20 hover:border-[#FF6B35]/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Email Us
                      </div>
                      <div className="text-white font-medium">
                        {contactInfo.email}
                      </div>
                    </div>
                  </a>

                  {/* Response time */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/15">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B35]/15 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#FF6B35] uppercase tracking-wider">
                        Response Time
                      </div>
                      <div className="text-white font-medium">
                        Usually within 24 hours
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-10 text-gray-500 text-sm"
          >
            {["Licensed & Insured", "Independent Advisor", "Client-First Always"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>{item}</span>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
