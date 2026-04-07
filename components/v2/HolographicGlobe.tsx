"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

// Configuration - Enhanced visibility
const GLOBE_CONFIG = {
  radius: 2.5,
  segments: 64,
  color: "#FF6B35",
  colorSecondary: "#FFFFFF",
  rotationSpeed: 0.03,
  mouseInfluence: 0.15,
  inertia: 0.95,
  // Increased opacity values for better visibility
  baseOpacity: 1.8, // Multiplier for all opacity values
};

// Latitude ring component - creates horizontal rings around the sphere
function LatitudeRing({ radius, y, opacity }: { radius: number; y: number; opacity: number }) {
  const ringRadius = Math.sqrt(radius * radius - y * y);

  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([
        Math.cos(angle) * ringRadius,
        y,
        Math.sin(angle) * ringRadius
      ]);
    }
    return pts;
  }, [ringRadius, y]);

  return (
    <Line
      points={points}
      color={GLOBE_CONFIG.color}
      lineWidth={1.5}
      transparent
      opacity={Math.min(opacity * GLOBE_CONFIG.baseOpacity, 0.6)}
    />
  );
}

// Longitude arc component - creates vertical arcs around the sphere
function LongitudeArc({ radius, rotation, opacity }: { radius: number; rotation: number; opacity: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ]);
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[0, rotation, 0]}>
      <Line
        points={points}
        color={GLOBE_CONFIG.colorSecondary}
        lineWidth={1.2}
        transparent
        opacity={Math.min(opacity * GLOBE_CONFIG.baseOpacity, 0.5)}
      />
    </group>
  );
}

// Orbital ring - tilted rings that orbit around the globe
function OrbitalRing({
  radius,
  tiltX,
  tiltZ,
  opacity,
  dashed = false,
  color = GLOBE_CONFIG.color
}: {
  radius: number;
  tiltX: number;
  tiltZ: number;
  opacity: number;
  dashed?: boolean;
  color?: string;
}) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ]);
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <Line
        points={points}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={Math.min(opacity * GLOBE_CONFIG.baseOpacity, 0.5)}
        dashed={dashed}
        dashSize={0.15}
        gapSize={0.1}
      />
    </group>
  );
}

// Data nodes that float on the sphere surface
function DataNodes({ radius, count }: { radius: number; count: number }) {
  const nodes = useMemo(() => {
    const result: { position: [number, number, number]; size: number; opacity: number }[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      result.push({
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ],
        size: 0.025 + Math.random() * 0.04,
        opacity: (0.4 + Math.random() * 0.4) * GLOBE_CONFIG.baseOpacity,
      });
    }
    return result;
  }, [radius, count]);

  return (
    <group>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshBasicMaterial
            color={GLOBE_CONFIG.color}
            transparent
            opacity={node.opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Inner core glow
function InnerCore({ radius }: { radius: number }) {
  return (
    <>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[radius * 0.3, 32, 32]} />
        <meshBasicMaterial
          color={GLOBE_CONFIG.color}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Secondary inner glow */}
      <mesh>
        <sphereGeometry args={[radius * 0.5, 32, 32]} />
        <meshBasicMaterial
          color={GLOBE_CONFIG.color}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

// Main globe structure
function GlobeStructure({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const baseRotation = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Base continuous rotation
    baseRotation.current += delta * GLOBE_CONFIG.rotationSpeed;

    // Calculate target rotation based on mouse position
    targetRotation.current.x = mousePosition.y * GLOBE_CONFIG.mouseInfluence;
    targetRotation.current.y = mousePosition.x * GLOBE_CONFIG.mouseInfluence;

    // Apply inertia for smooth movement
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * (1 - GLOBE_CONFIG.inertia);
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * (1 - GLOBE_CONFIG.inertia);

    // Apply rotations
    groupRef.current.rotation.x = currentRotation.current.x + 0.2;
    groupRef.current.rotation.y = baseRotation.current + currentRotation.current.y;
  });

  const radius = GLOBE_CONFIG.radius;

  // Generate latitude lines at different heights
  const latitudes = useMemo(() => {
    const lats: { y: number; opacity: number }[] = [];
    const count = 7;
    for (let i = 1; i < count; i++) {
      const y = radius * Math.cos((i / count) * Math.PI);
      lats.push({ y, opacity: 0.15 - Math.abs(y / radius) * 0.08 });
      lats.push({ y: -y, opacity: 0.15 - Math.abs(y / radius) * 0.08 });
    }
    return lats;
  }, [radius]);

  // Generate longitude lines
  const longitudes = useMemo(() => {
    const longs: { rotation: number; opacity: number }[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      longs.push({
        rotation: (i / count) * Math.PI,
        opacity: 0.08 + (i % 2) * 0.04,
      });
    }
    return longs;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Inner core glow */}
      <InnerCore radius={radius} />

      {/* Main sphere outline */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color={GLOBE_CONFIG.color}
          transparent
          opacity={0.06}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Latitude rings */}
      {latitudes.map((lat, i) => (
        <LatitudeRing key={`lat-${i}`} radius={radius} y={lat.y} opacity={lat.opacity} />
      ))}

      {/* Equator - stronger */}
      <LatitudeRing radius={radius} y={0} opacity={0.25} />

      {/* Longitude arcs */}
      {longitudes.map((lng, i) => (
        <LongitudeArc key={`lng-${i}`} radius={radius} rotation={lng.rotation} opacity={lng.opacity} />
      ))}

      {/* Data nodes */}
      <DataNodes radius={radius} count={30} />

      {/* Orbital rings */}
      <OrbitalRing radius={radius * 1.15} tiltX={Math.PI * 0.45} tiltZ={0.2} opacity={0.12} />
      <OrbitalRing radius={radius * 1.25} tiltX={-Math.PI * 0.3} tiltZ={-0.15} opacity={0.08} dashed />
      <OrbitalRing radius={radius * 1.35} tiltX={Math.PI * 0.15} tiltZ={0.3} opacity={0.06} color="#FFFFFF" />

      {/* Inner rings for depth */}
      <OrbitalRing radius={radius * 0.7} tiltX={Math.PI * 0.5} tiltZ={0} opacity={0.08} />
      <OrbitalRing radius={radius * 0.5} tiltX={0} tiltZ={Math.PI * 0.5} opacity={0.05} />
    </group>
  );
}

// Scene component with mouse tracking
function Scene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Ambient lighting for subtle visibility */}
      <ambientLight intensity={0.5} />

      {/* Float effect for subtle drifting */}
      <Float
        speed={0.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
      >
        <GlobeStructure mousePosition={mousePosition} />
      </Float>
    </>
  );
}

// Mobile fallback - simplified SVG version
function MobileFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="relative opacity-[0.12]"
        style={{
          transform: "translateX(20%) translateY(5%)",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-72 h-72 animate-spin-slow"
        >
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.5"
          />
          {/* Inner circles for depth */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.3"
            opacity="0.6"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.2"
            opacity="0.4"
          />
          {/* Horizontal ellipses */}
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="25"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.3"
            opacity="0.5"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="40"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.3"
            opacity="0.4"
            transform="rotate(30, 100, 100)"
          />
          {/* Vertical ellipse */}
          <ellipse
            cx="100"
            cy="100"
            rx="30"
            ry="80"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.3"
            opacity="0.5"
          />
          {/* Tilted orbital ring */}
          <ellipse
            cx="100"
            cy="100"
            rx="90"
            ry="20"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.4"
            opacity="0.6"
            transform="rotate(-20, 100, 100)"
          />
        </svg>
      </div>
    </div>
  );
}

// Main exported component
export function HolographicGlobe() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isClient) return null;

  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        transform: "translateX(15%) translateY(-5%)",
      }}
    >
      {/* Outer glow effect - Enhanced */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.35) 0%, rgba(255, 107, 53, 0.1) 50%, transparent 70%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          background: "transparent",
          pointerEvents: "none",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
