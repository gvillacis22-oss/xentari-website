import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialCard } from "@/components/ui/Card";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-display-mobile font-bold text-white sm:text-display">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Don't just take our word for it. Here's what our clients have to say
            about working with us.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>

        {/* Link to more */}
        <div className="mt-12 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
          >
            Read More Stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
