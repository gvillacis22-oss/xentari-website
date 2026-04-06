"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Link from "next/link";
import { testimonials } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TestimonialsV2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, []);

  const goToIndex = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-subtle/30 to-background" />

      {/* Layer 2: Ambient glows */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.25, 0.4, 0.25],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="text-display-mobile md:text-display font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-text-secondary text-lg">
            Real stories from real people who've transformed their financial
            futures.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Main testimonial card */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background-card/80 backdrop-blur-sm">
              {/* Quote decoration with glow */}
              <div className="absolute top-8 left-8 text-accent/10">
                <motion.div
                  animate={{
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Quote className="w-24 h-24" />
                </motion.div>
              </div>

              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

              {/* Testimonial content */}
              <div className="relative p-8 md:p-12 min-h-[350px] flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-accent text-accent" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                      "{testimonials[activeIndex].quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Avatar with glow */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-0 bg-accent/30 rounded-full blur-md" />
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-lg">
                          {testimonials[activeIndex].author.charAt(0)}
                        </div>
                      </motion.div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonials[activeIndex].author}
                        </div>
                        <div className="text-text-secondary text-sm">
                          {testimonials[activeIndex].role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <motion.button
                  onClick={() => {
                    goToPrev();
                    setIsAutoPlaying(false);
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-background-elevated/80 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-accent transition-all duration-200"
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    goToNext();
                    setIsAutoPlaying(false);
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-background-elevated/80 backdrop-blur-sm border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-accent transition-all duration-200"
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className="relative"
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      index === activeIndex
                        ? "w-8 h-2 bg-accent"
                        : "w-2 h-2 bg-border hover:bg-text-muted"
                    )}
                    layoutId="testimonial-dot"
                  />
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 bg-accent rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255, 107, 53, 0.4)",
                          "0 0 0 6px rgba(255, 107, 53, 0)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Link to all testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-medium"
            >
              Read More Success Stories
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
