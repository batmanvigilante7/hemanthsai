"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { thoughtWorkspaces, getWorkspaceById } from "@/data/thought-workspaces";
import { ThoughtWorkspaceNode, getWorkspaceIcon } from "./ThoughtWorkspaceNode";
import { ThoughtPanel } from "./ThoughtPanel";
import { cn } from "@/lib/utils";
import { MacbookScroll } from "./ui/macbook-scroll";
import ThoughtOSScreen from "./ThoughtOSScreen";

const getAssetUrl = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export function ThoughtWorkspace() {
  const [activeId, setActiveId] = useState<string>("ai-leverage");

  const activeWorkspace = getWorkspaceById(activeId);
  const thoughtWorkspaceScene = getAssetUrl("thought-workspace-scene.webp");

  return (
    <>
      <section
        id="thought-workspace"
        className="relative min-h-[140vh] overflow-visible bg-black text-white px-6 md:px-10"
        aria-label="Thought Workspace Section"
      >
        {/* Workspace background */}
        <div className="absolute inset-0 overflow-hidden bg-black z-0 pointer-events-none select-none">
          <img
            src={thoughtWorkspaceScene}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 w-[100vw] h-auto max-w-none -translate-x-1/2 -translate-y-1/2 scale-[0.92] opacity-100 brightness-105 contrast-105"
          />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />

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

        {/* Foreground content wrapper */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex min-h-screen flex-col items-center justify-start pt-32 md:pt-36">
          
          {/* Header Area (Scrolls away normally) */}
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

          {/* Desktop View: Interactive ThoughtOS inside MacbookScroll */}
          <div className="relative hidden lg:flex w-full max-w-4xl mx-auto mt-24 md:mt-32 scale-[0.92] origin-top items-start justify-center overflow-visible z-10">
            <MacbookScroll
              title={
                <span className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                  Hemanth Sai <br /> Proof Hub
                </span>
              }
              screenContent={<ThoughtOSScreen />}
              showGradient={false}
            />
          </div>

          {/* Mobile/Tablet Fallback View: Static Bezel Mockup with App Grid */}
          <div className="lg:hidden w-full max-w-[1400px] px-6 md:px-10 flex flex-col items-center pb-20">
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
