"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BackgroundProps {
  variant?: "default" | "hero" | "section" | "cta";
  enableMouse?: boolean;
  intensity?: "low" | "medium" | "high";
}

export function Background({
  variant = "default",
  enableMouse = true,
  intensity = "medium",
}: BackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!enableMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle updates for performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableMouse]);

  const opacityMap = {
    low: { primary: 0.08, secondary: 0.05, tertiary: 0.03 },
    medium: { primary: 0.12, secondary: 0.08, tertiary: 0.05 },
    high: { primary: 0.18, secondary: 0.12, tertiary: 0.08 },
  };

  const opacity = opacityMap[intensity];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-background to-[#080808]" />

      {/* Secondary radial gradient - fixed position */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 107, 53, ${opacity.tertiary}) 0%, transparent 50%)`,
        }}
      />

      {/* Mouse-following primary glow */}
      {enableMouse && (
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          animate={{
            x: `calc(${mousePosition.x}% - 400px)`,
            y: `calc(${mousePosition.y}% - 400px)`,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50,
            mass: 1,
          }}
          style={{
            background: `radial-gradient(circle, rgba(255, 107, 53, ${opacity.primary}) 0%, transparent 60%)`,
            filter: "blur(60px)",
          }}
        />
      )}

      {/* Static ambient glow - top right */}
      <motion.div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [opacity.secondary, opacity.secondary * 1.3, opacity.secondary],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle, rgba(255, 107, 53, 1) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Static ambient glow - bottom left */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [opacity.tertiary, opacity.tertiary * 1.5, opacity.tertiary],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: `radial-gradient(circle, rgba(255, 107, 53, 1) 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      {/* Grid pattern - very subtle */}
      {variant === "hero" && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
