import type { Metadata } from "next";
import { TestimonialCard } from "@/components/ui/Card";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what our clients say about working with Xentari. Real stories from individuals, families, and business owners we've helped.",
};

// Extended testimonials for the full page
const allTestimonials = [
  {
    quote:
      "They took something I dreaded—choosing health insurance—and made it actually simple. I finally feel like I have the right coverage for the first time in years.",
    author: "Sarah M.",
    role: "Self-Employed Consultant",
  },
  {
    quote:
      "Our company was overpaying for employee benefits. They restructured our entire plan and saved us 20% while actually improving coverage. Highly recommend.",
    author: "James T.",
    role: "CEO, Tech Startup",
  },
  {
    quote:
      "The tax structuring advice alone was worth it. I didn't know these options even existed. They've saved me thousands—and I'm keeping more of what I earn.",
    author: "Michael R.",
    role: "Real Estate Investor",
  },
  {
    quote:
      "When my husband changed jobs and we lost coverage, I was panicking. They found us a great plan within days and handled everything. Such a relief.",
    author: "Jennifer L.",
    role: "Mother of Three",
  },
  {
    quote:
      "As a small business owner, I didn't think I could afford to offer benefits. They showed me options I didn't know existed and now my team has great coverage.",
    author: "David K.",
    role: "Restaurant Owner",
  },
  {
    quote:
      "They actually listen. Other agents just tried to sell me whatever made them the most money. Xentari took time to understand what I actually needed.",
    author: "Amanda S.",
    role: "Freelance Designer",
  },
  {
    quote:
      "The annual review is what sets them apart. Every year they check in, compare new options, and make sure I'm still on the best plan. That kind of service is rare.",
    author: "Robert H.",
    role: "Retired Executive",
  },
  {
    quote:
      "I was skeptical about the tax structuring side, but they connected me with strategies that saved me more than their entire service cost. No brainer.",
    author: "Lisa P.",
    role: "Medical Professional",
  },
  {
    quote:
      "Finally, someone who explains insurance in plain English. No confusing jargon, no pressure—just honest guidance. Exactly what I needed.",
    author: "Chris W.",
    role: "Small Business Owner",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-mobile font-bold text-white sm:text-display">
              What Our Clients Say
            </h1>
            <p className="mt-6 text-xl text-text-secondary">
              Don't just take our word for it. Here's what real clients have to
              say about their experience working with Xentari.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-background-subtle">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-12 text-3xl font-bold text-white">
              The Numbers Speak
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="text-5xl font-bold text-accent">500+</div>
                <div className="mt-2 text-text-muted">Clients Served</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent">98%</div>
                <div className="mt-2 text-text-muted">Client Retention</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent">7+</div>
                <div className="mt-2 text-text-muted">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
