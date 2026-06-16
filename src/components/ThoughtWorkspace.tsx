"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { thoughtWorkspaces, getWorkspaceById } from "@/data/thought-workspaces";
import { ThoughtWorkspaceNode, getWorkspaceIcon } from "./ThoughtWorkspaceNode";
import { ThoughtPanel } from "./ThoughtPanel";
import { cn } from "@/lib/utils";
import { MacbookScroll } from "./ui/macbook-scroll";
import ThoughtOSScreen from "./ThoughtOSScreen";

const getAssetUrl = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export function ThoughtWorkspace() {
  const [activeId, setActiveId] = useState<string>("ai-leverage");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textTransform = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

  const activeWorkspace = getWorkspaceById(activeId);
  const thoughtWorkspaceScene = getAssetUrl("thought-workspace-scene.webp");

  return (
    <>
      <section
        id="thought-workspace"
        ref={sectionRef}
        className="relative min-h-[260vh] overflow-visible bg-black text-white px-6 md:px-10"
        aria-label="Thought Workspace Section"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 z-10 h-screen overflow-visible w-full flex flex-col justify-start">
          {/* Workspace background */}
          <img
            src={thoughtWorkspaceScene}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover object-bottom opacity-100 brightness-100 contrast-105 pointer-events-none select-none"
          />
          <div className="absolute inset-0 z-0 bg-black/25 pointer-events-none" />

          {/* SVG Gooey Filter definitions */}
          <svg className="hidden">
            <defs>
              <filter id="gooey-blend">
                <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>

          <div className="relative mx-auto h-full w-full max-w-[1400px] px-8 pt-[110px] z-10">
            {/* Big intro layer - high, not beside laptop */}
            <motion.div
              style={{
                translateY: textTransform,
                opacity: textOpacity,
              }}
              className="pointer-events-none absolute left-8 top-[5.2rem] max-w-[760px] hidden lg:block"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Thought Workspace
              </p>
              <h2 className="text-[clamp(3.4rem,6.5vw,5.8rem)] font-black uppercase leading-[0.86] tracking-[-0.075em] text-white">
                The Mental Desktop Where Ideas Become Proof.
              </h2>
            </motion.div>

            {/* Small paragraph can stay high/right, not beside laptop */}
            <motion.p
              style={{
                translateY: textTransform,
                opacity: textOpacity,
              }}
              className="pointer-events-none absolute right-8 top-[11.8rem] max-w-[560px] text-base leading-7 text-white/60 hidden lg:block"
            >
              A visual workspace of the recurring questions, creative loops, and thinking patterns that shape how I move from first spark to something real enough to share.
            </motion.p>

            {/* MacBook placement target */}
            <div className="absolute left-1/2 top-[47%] w-full max-w-[700px] -translate-x-1/2 overflow-visible hidden lg:flex justify-center z-20">
              <MacbookScroll
                title={
                  <span>
                    From thought loops. <br /> Turning curiosity into visible proof.
                  </span>
                }
                showGradient={false}
                screenContent={<ThoughtOSScreen scrollYProgress={scrollYProgress} />}
                sectionMode
                scrollYProgress={scrollYProgress}
                scaleXMax={1.32}
                scaleYMax={1.32}
                translateMax={120}
                scaleXMin={1.05}
                scaleYMin={0.52}
              />
            </div>
          </div>
        </div>

        {/* Foreground content wrapper (Mainly holds Mobile Layout and scrolls naturally) */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex min-h-screen flex-col items-center justify-start pt-32 md:pt-36 lg:hidden">
          
          {/* Header Area (Mobile Only) */}
          <div className="w-full pb-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                  Thought Workspace
                </p>
                <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl text-white">
                  The mental desktop where ideas become proof.
                </h2>
              </div>
              <div>
                <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
                  A visual workspace of the recurring questions, creative loops, and thinking patterns that shape how I move from first spark to something real enough to share.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Fallback View: Static Bezel Mockup with App Grid */}
          <div className="w-full max-w-[1400px] px-6 md:px-10 flex flex-col items-center pb-20">
            {/* Custom screen frame for mobile */}
            <div className="relative w-full bg-[#161615] rounded-2xl border-[6px] border-neutral-900 overflow-hidden shadow-inner flex flex-col aspect-[4/3] min-h-[360px] sm:min-h-[460px]">
              {/* Webcam Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-b-xl z-50 flex items-center justify-center pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60 ring-1 ring-blue-500/20" />
              </div>

              {/* Desktop Screen Canvas */}
              <div className="relative flex-1 w-full h-full bg-[#050505] overflow-hidden flex flex-col justify-between p-4">
                {/* Warm Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#18110b]/20 via-black/40 to-black/80 z-0 pointer-events-none" />

                {/* Mobile app icon grid */}
                <div className="grid grid-cols-4 gap-3 p-2 z-20 select-none max-w-lg mx-auto">
                  {thoughtWorkspaces.map((node) => {
                    const isActive = node.id === activeId;
                    const IconComponent = getWorkspaceIcon(node.iconName);
                    return (
                      <button
                        key={node.id}
                        onClick={() => setActiveId(node.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 p-2 rounded-xl border border-transparent transition-all duration-200 outline-none cursor-pointer",
                          isActive
                            ? "bg-amber-500/10 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]"
                            : "hover:bg-white/5"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shadow-md",
                          isActive
                            ? "bg-gradient-to-br from-amber-400 to-amber-600 text-black font-semibold"
                            : "bg-gradient-to-br from-[#2a2a29] to-[#151514] border border-white/5 text-amber-400/90"
                        )}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-[9px] font-bold tracking-tight text-white/80 text-center truncate max-w-full">
                          {node.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Panel Mobile View */}
            <div className="w-full mt-6">
              <AnimatePresence mode="wait">
                {activeId && activeWorkspace && (
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full"
                  >
                    <ThoughtPanel
                      node={activeWorkspace}
                      onSelectWorkspace={setActiveId}
                      onClose={() => setActiveId("")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
      <div className="h-[60vh] bg-black" />
    </>
  );
}

export default ThoughtWorkspace;
