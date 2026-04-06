"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MouseGlowProps {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  className?: string;
}

export function MouseGlow({
  size = 400,
  color = "255, 107, 53",
  opacity = 0.15,
  blur = 80,
  className = "",
}: MouseGlowProps) {
  const [mounted, setMounted] = useState(false);

  // Use springs for smooth following
  const mouseX = useSpring(0, { damping: 25, stiffness: 40 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 40 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, size]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`fixed pointer-events-none z-0 ${className}`}
      style={{
        width: size,
        height: size,
        x: mouseX,
        y: mouseY,
        background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 60%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
