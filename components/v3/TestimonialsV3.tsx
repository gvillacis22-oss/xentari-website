"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    role: "Business Owner",
    quote: "Helped me save thousands and finally understand my finances. I wish I found Xentari years ago.",
  },
  {
    name: "Sarah T.",
    role: "Family of 4",
    quote: "They found us better coverage at half the price. The process was simple and stress-free.",
  },
  {
    name: "David K.",
    role: "High-Income Professional",
    quote: "The tax strategies alone paid for themselves multiple times over. Highly recommend.",
  },
];

export function TestimonialsV3() {
  return (
    <section className="bg-[#0F0F11] py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real results from real people we've helped
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#0A0A0B] border border-white/[0.06] rounded-2xl p-6 relative"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-[#FF6B35]" />
              </div>

              {/* Quote text */}
              <p className="text-gray-300 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
                  <span className="text-[#FF6B35] font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
