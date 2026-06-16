"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import ImagesBadgeDemoTwo from "./images-badge-demo-2";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

interface ThoughtOSScreenProps {
  className?: string;
  scrollYProgress?: MotionValue<number>;
}

const thoughtOSItems = [
  {
    id: "ai-workflows",
    title: "AI Workflows",
    accentGrad: "from-violet-500 to-blue-500",
    accentHex: "#a78bfa",
  },
  {
    id: "building-apps",
    title: "Building Apps",
    accentGrad: "from-sky-400 to-cyan-500",
    accentHex: "#22d3ee",
  },
  {
    id: "user-experience",
    title: "User Experience",
    accentGrad: "from-pink-500 to-rose-500",
    accentHex: "#f43f5e",
  },
  {
    id: "product-ideas",
    title: "Product Ideas",
    accentGrad: "from-amber-400 to-orange-500",
    accentHex: "#f59e0b",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    accentGrad: "from-fuchsia-500 to-purple-600",
    accentHex: "#d946ef",
  },
  {
    id: "investing-ideas",
    title: "Investing Ideas",
    accentGrad: "from-emerald-500 to-lime-500",
    accentHex: "#10b981",
  },
  {
    id: "getting-things-done",
    title: "Getting Things Done",
    accentGrad: "from-blue-500 to-indigo-600",
    accentHex: "#3b82f6",
  },
  {
    id: "visible-progress",
    title: "Visible Progress",
    accentGrad: "from-yellow-400 to-amber-500",
    accentHex: "#facc15",
  },
];

const getDocSVG = (colorHex: string, label: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="130" viewBox="0 0 100 130">
    <defs>
      <linearGradient id="g-${label.replace(/[^a-zA-Z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2a2c35" />
        <stop offset="100%" stop-color="#14151b" />
      </linearGradient>
      <linearGradient id="edge-${label.replace(/[^a-zA-Z0-9]/g, '')}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.25)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="126" rx="6" fill="url(#g-${label.replace(/[^a-zA-Z0-9]/g, '')})" stroke="url(#edge-${label.replace(/[^a-zA-Z0-9]/g, '')})" stroke-width="1.5" />
    <path d="M 75,2 L 98,25 L 83,25 C 78,25 75,22 75,17 Z" fill="#1b1c23" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <rect x="15" y="45" width="70" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="15" y="60" width="50" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="15" y="75" width="58" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="15" y="105" width="22" height="4" rx="2" fill="${colorHex}" />
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const artifactCards = [
  { id: 1, type: "Codebase", detail: "Repository", progress: 92, endY: 38 },
  { id: 2, type: "Design System", detail: "Figma Spec", progress: 100, endY: 50 },
  { id: 3, type: "Documentation", detail: "Architecture", progress: 75, endY: 62 },
  { id: 4, type: "Production Build", detail: "Static Assets", progress: 88, endY: 74 },
];


export default function ThoughtOSScreen({ className, scrollYProgress: customScrollYProgress }: ThoughtOSScreenProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [_, setRender] = useState({});

  useEffect(() => {
    containerRef.current = document.getElementById("thought-workspace");
    setRender({});
  }, []);

  const { scrollYProgress: defaultScrollYProgress } = useScroll({
    target: containerRef.current ? containerRef : undefined,
    offset: ["start center", "end center"],
  });

  const scrollYProgress = customScrollYProgress || defaultScrollYProgress;

  // Aceternity Google Gemini Effect path length transforms
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.08, 0.45], [0, 1]);
  const pathLengthThird = useTransform(scrollYProgress, [0.16, 0.55], [0, 1]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.5, 0.82], [0, 1]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.58, 1], [0, 1]);

  // Semantic custom paths timing
  const incomingLength = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const outgoingLength = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  // Center node glow peaking around 0.40 to 0.65
  const centerGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.40, 0.525, 0.65, 1],
    [0.2, 0.2, 1.0, 1.0, 0.4]
  );

  // Right artifact stack fading/sliding in
  const artifactOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0.15, 1]);
  const artifactY = useTransform(scrollYProgress, [0.4, 0.85], [10, 0]);

  // Pulse rings scale and opacity based on scroll progress (peaking when incoming meets center at 0.45-0.55)
  const ring1Scale = useTransform(scrollYProgress, [0, 0.45, 0.58, 0.68, 1], [0.9, 1.0, 1.8, 2.6, 2.6]);
  const ring1Opacity = useTransform(scrollYProgress, [0, 0.45, 0.48, 0.58, 0.64, 1], [0, 0, 0.8, 0.5, 0, 0]);

  const ring2Scale = useTransform(scrollYProgress, [0, 0.49, 0.62, 0.72, 1], [0.9, 1.0, 1.8, 2.6, 2.6]);
  const ring2Opacity = useTransform(scrollYProgress, [0, 0.49, 0.52, 0.62, 0.68, 1], [0, 0, 0.7, 0.4, 0, 0]);

  // Center node scroll-dependent scale pulse
  const centerPulseScale = useTransform(
    scrollYProgress,
    [0, 0.42, 0.45, 0.49, 0.53, 0.57, 0.61, 0.65, 0.70, 1],
    [1, 1, 1.15, 0.96, 1.18, 0.96, 1.12, 0.98, 1.05, 1]
  );

  // Dynamic status text opacities representing the phase progression
  const ideasOpacity = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 1, 0]);
  const processingOpacity = useTransform(scrollYProgress, [0.30, 0.35, 0.45, 0.50], [0, 1, 1, 0]);
  const convergenceOpacity = useTransform(scrollYProgress, [0.47, 0.51, 0.63, 0.67], [0, 1, 1, 0]);
  const proofOpacity = useTransform(scrollYProgress, [0.64, 0.68, 1.0], [0, 1, 1]);

  // Map sources and distribute vertically
  const sources = thoughtOSItems.map((item, index) => {
    const startY = 12;
    const endY = 88;
    const y = startY + index * (endY - startY) / 7;
    return {
      ...item,
      y,
    };
  });

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden select-none pointer-events-auto font-sans flex flex-col justify-between transition-all duration-300",
        className
      )}
      style={{
        backgroundColor: "#070708",
        backgroundImage: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 50%),
          radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08), transparent 60%),
          radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.05), transparent 50%),
          radial-gradient(circle at 85% 85%, rgba(139, 92, 246, 0.04), transparent 50%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E")
        `
      }}
    >
      {/* Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)] z-0 pointer-events-none" />

      {/* 1. Google Gemini Effect Layer (Wow / Scroll Energy) */}
      <motion.div className="pointer-events-none absolute inset-0 z-10 overflow-hidden [&_button]:hidden [&_p]:hidden">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2 scale-[0.62] opacity-25">
          <GoogleGeminiEffect
            pathLengths={[
              pathLengthFirst,
              pathLengthSecond,
              pathLengthThird,
              pathLengthFourth,
              pathLengthFifth,
            ]}
            title=" "
            description=" "
          />
        </div>
      </motion.div>

      {/* 2. Custom semantic paths: connects actual UI zones */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-15"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="softWhiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.60)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0.48)" />
          </linearGradient>
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* incomingPaths: Left Sources -> Center Brain */}
        <g id="incomingPaths">
          {sources.map((source) => {
            const startX = 27;
            const startY = source.y;
            const endX = 50;
            const endY = 50;
            // S-curve Bezier path
            const pathD = `M ${startX} ${startY} C ${startX + 8} ${startY}, ${endX - 8} ${endY}, ${endX} ${endY}`;

            return (
              <g key={`in-${source.id}`}>
                {/* Background path (subtle, low opacity) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="0.4"
                />
                {/* Active path with glow */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#softWhiteGradient)"
                  strokeWidth="0.75"
                  filter="url(#subtle-glow)"
                  style={{
                    pathLength: incomingLength,
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* outgoingPaths: Center Brain -> Right Artifact Stack */}
        <g id="outgoingPaths">
          {artifactCards.map((card) => {
            const startX = 50;
            const startY = 50;
            const endX = 72;
            const endY = card.endY;
            const pathD = `M ${startX} ${startY} C ${startX + 8} ${startY}, ${endX - 8} ${endY}, ${endX} ${endY}`;

            return (
              <g key={`out-${card.id}`}>
                {/* Background path (subtle, low opacity) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="0.4"
                />
                {/* Active path with glow */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#softWhiteGradient)"
                  strokeWidth="0.75"
                  filter="url(#subtle-glow)"
                  style={{
                    pathLength: outgoingLength,
                  }}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Strict 3-column Layout */}
      <div className="grid grid-cols-[30%_40%_30%] h-full w-full relative z-20">
        
        {/* Left Column: Knowledge Sources (x = 0% to 30%) */}
        <div className="relative h-full w-full">
          {sources.map((source) => (
            <div
              key={source.id}
              style={{
                position: "absolute",
                right: "6%", // Positions elements on the right-side of the left column (x ~ 16% to 28%)
                top: `${source.y}%`,
                transform: "translateY(-50%)",
              }}
              className="flex items-center gap-1.5 whitespace-nowrap z-20"
            >
              <ImagesBadgeDemoTwo
                text=""
                images={[
                  getDocSVG(source.accentHex, `${source.id}-doc-1`),
                  getDocSVG(source.accentHex, `${source.id}-doc-2`),
                  getDocSVG(source.accentHex, `${source.id}-doc-3`),
                ]}
                folderSize={{ width: 13, height: 10 }}
                teaserImageSize={{ width: 8.5, height: 5.5 }}
                hoverImageSize={{ width: 34, height: 25 }}
                hoverTranslateY={-12}
                hoverSpread={8}
                hoverRotation={10}
                folderColorClass={`bg-gradient-to-br ${source.accentGrad}`}
                containerClassName="w-fit shrink-0 pointer-events-auto"
                className="drop-shadow-[0_0_8px_rgba(245,158,11,0.15)]"
              />
              <span className="text-[7.5px] font-black tracking-tight text-white/70 select-none">
                {source.title}
              </span>
            </div>
          ))}
        </div>

        {/* Center Column: Brain Node (x = 30% to 70%) */}
        <div className="relative h-full w-full">
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="flex flex-col items-center justify-center text-center z-30"
          >
            {/* Glowing Brain Circle */}
            <motion.div
              style={{
                scale: centerPulseScale,
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 10px rgba(245, 158, 11, 0.15)",
              }}
              className="w-16 h-16 rounded-full border border-amber-500/40 bg-black/90 flex flex-col items-center justify-center relative z-20"
            >
              {/* Glow highlight */}
              <motion.div
                style={{
                  opacity: centerGlowOpacity,
                }}
                className="absolute inset-0 rounded-full bg-amber-500/10 blur-sm pointer-events-none"
              />
              
              {/* Glowing inner border */}
              <motion.div
                style={{
                  opacity: centerGlowOpacity,
                  borderColor: "rgba(245, 158, 11, 0.75)",
                  boxShadow: "0 0 14px rgba(245, 158, 11, 0.45)",
                }}
                className="absolute inset-0 rounded-full border border-amber-500/30 transition-all duration-300 pointer-events-none"
              />

              <span className="text-[6.5px] font-black tracking-widest text-amber-400 select-none whitespace-nowrap z-10">
                THOUGHT_OS
              </span>

              {/* Pulse Ring 1 */}
              <motion.div
                style={{
                  scale: ring1Scale,
                  opacity: ring1Opacity,
                  borderColor: "rgba(245, 158, 11, 0.6)",
                  boxShadow: "0 0 10px rgba(245, 158, 11, 0.3), inset 0 0 5px rgba(245, 158, 11, 0.1)",
                }}
                className="absolute inset-0 rounded-full border pointer-events-none z-0"
              />

              {/* Pulse Ring 2 */}
              <motion.div
                style={{
                  scale: ring2Scale,
                  opacity: ring2Opacity,
                  borderColor: "rgba(245, 158, 11, 0.4)",
                  boxShadow: "0 0 8px rgba(245, 158, 11, 0.2), inset 0 0 4px rgba(245, 158, 11, 0.05)",
                }}
                className="absolute inset-0 rounded-full border pointer-events-none z-0"
              />
            </motion.div>

            {/* Dynamic cross-fading status text */}
            <div className="relative mt-2 h-4 w-32 flex items-center justify-center select-none overflow-visible">
              <motion.span
                style={{ opacity: ideasOpacity }}
                className="absolute text-[5.5px] font-bold uppercase tracking-widest text-white/50 leading-none whitespace-nowrap"
              >
                Ideas
              </motion.span>
              <motion.span
                style={{ opacity: processingOpacity }}
                className="absolute text-[5.5px] font-bold uppercase tracking-widest text-amber-500/80 leading-none whitespace-nowrap"
              >
                Processing...
              </motion.span>
              <motion.span
                style={{ opacity: convergenceOpacity }}
                className="absolute text-[5.5px] font-bold uppercase tracking-widest text-amber-400 leading-none whitespace-nowrap"
              >
                Convergence
              </motion.span>
              <motion.span
                style={{ opacity: proofOpacity }}
                className="absolute text-[5.5px] font-bold uppercase tracking-widest text-emerald-400 leading-none whitespace-nowrap animate-pulse"
              >
                Proof Generated
              </motion.span>
            </div>
          </div>
        </div>

        {/* Right Column: Production Ready Artifacts (x = 70% to 100%) */}
        <div className="relative h-full w-full">
          <motion.div
            style={{
              position: "absolute",
              left: "6%", // Aligns the stack around x ~ 72%
              width: "56%", // Cards width spans to x ~ 88%
              top: "50%",
              transform: "translateY(-50%)",
              opacity: artifactOpacity,
              y: artifactY,
            }}
            className="flex flex-col gap-2.5 z-20 pr-4" // padding-right guarantees padding from screen edge
          >
            {/* Label - split into two lines */}
            <div className="flex flex-col gap-0.5 select-none text-left">
              <span className="text-[6.5px] font-black uppercase tracking-widest text-white/35 leading-none">
                PRODUCTION
              </span>
              <span className="text-[6.5px] font-black uppercase tracking-widest text-white/35 leading-none">
                ARTIFACTS
              </span>
            </div>

            {/* Abstract Card Stack */}
            <div className="flex flex-col w-full">
              {artifactCards.map((card, idx) => (
                <div
                  key={card.id}
                  style={{
                    zIndex: 20 + idx,
                  }}
                  className={cn(
                    "p-2 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-md flex flex-col justify-between h-[38px] w-full hover:border-amber-500/20 transition-all duration-300 relative group pointer-events-auto",
                    idx > 0 && "-mt-1.5"
                  )}
                >
                  {/* Subtle highlight border */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-amber-500/10 transition-colors duration-300 pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] font-extrabold text-white/80 select-none">
                      {card.type}
                    </span>
                    <span className="text-[5.5px] text-white/35 font-mono select-none">
                      {card.detail}
                    </span>
                  </div>

                  {/* Progress/detail lines */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500/50 rounded-full"
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                    <span className="text-[5px] font-mono text-amber-500/80 select-none">
                      {card.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
