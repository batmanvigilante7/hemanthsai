"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { thoughtWorkspaces, getWorkspaceById } from "@/data/thought-workspaces";
import { ThoughtWorkspaceNode, getWorkspaceIcon } from "./ThoughtWorkspaceNode";
import { ThoughtDock } from "./ThoughtDock";
import { ThoughtPanel } from "./ThoughtPanel";
import { cn } from "@/lib/utils";

const getAssetUrl = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const blobVariants = {
  animate1: {
    x: [0, 60, -30, 0],
    y: [0, -40, 50, 0],
    scale: [1, 1.15, 0.9, 1],
  },
  animate2: {
    x: [0, -50, 40, 0],
    y: [0, 50, -30, 0],
    scale: [1, 0.9, 1.1, 1],
  },
  animate3: {
    x: [0, 30, -40, 0],
    y: [0, -30, 30, 0],
    scale: [1, 1.05, 0.95, 1],
  },
};

export function ThoughtWorkspace() {
  const [activeId, setActiveId] = useState<string>("ai-leverage");

  const activeWorkspace = getWorkspaceById(activeId);

  return (
    <section
      id="thought-workspace"
      className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white sm:py-24 md:px-10"
      aria-label="Thought Workspace Section"
    >
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

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
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
              A visual workspace of the recurring questions, creative loops, and thinking
              patterns that shape how I approach ideas — from the first spark to something
              real enough to share.
            </p>
          </div>
        </div>

        {/* 1. MacBook Pro Mockup Container */}
        <div className="relative mx-auto w-full max-w-[1150px] bg-[#0d0d0d] rounded-3xl p-3 md:p-5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] border border-white/5">
          
          {/* MacBook Screen Bezel */}
          <div className="relative w-full bg-[#161615] rounded-2xl border-[6px] md:border-[10px] border-neutral-900 overflow-hidden shadow-inner flex flex-col aspect-[4/3] md:aspect-[4/3] lg:aspect-[16/10] min-h-[360px] sm:min-h-[460px] lg:min-h-[600px]">
            
            {/* Webcam Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-b-xl z-50 flex items-center justify-center pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60 ring-1 ring-blue-500/20" />
            </div>

            {/* Desktop Screen Canvas */}
            <div className="relative flex-1 w-full h-full bg-[#050505] overflow-hidden flex flex-col justify-between p-4">
              
              {/* Wallpaper Background */}
              <img
                src={getAssetUrl("thought-workspace-bg.webp")}
                alt="Cinematic thought workspace backdrop"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.26] mix-blend-lighten pointer-events-none select-none z-0"
              />

              {/* Warm Ambient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#18110b]/20 via-black/40 to-black/80 z-0 pointer-events-none" />

              {/* macOS-style Menu Bar */}
              <div className="absolute left-0 right-0 top-0 z-40 flex h-8 items-center justify-between border-b border-white/10 bg-black/35 px-4 text-[10px] text-white/70 backdrop-blur-xl pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.25)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.2)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80 shadow-[0_0_10px_rgba(74,222,128,0.2)]" />
                  <span className="ml-3 font-semibold tracking-wide text-white/85">ThoughtOS</span>
                </div>

                <div className="hidden items-center gap-5 md:flex">
                  <span>Mind</span>
                  <span>Build</span>
                  <span>Ship</span>
                  <span>Proof</span>
                </div>

                <div className="font-mono text-white/45">09:41</div>
              </div>

              {/* Gooey Ambient Atmosphere */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-15"
                style={{ filter: "url(#gooey-blend)" }}
              >
                <motion.div
                  variants={blobVariants}
                  animate="animate1"
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[20%] top-[20%] h-44 w-44 rounded-full bg-amber-500/30 blur-md"
                />
                <motion.div
                  variants={blobVariants}
                  animate="animate2"
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[25%] bottom-[25%] h-48 w-48 rounded-full bg-yellow-400/25 blur-md"
                />
              </div>

              {/* 3. Desktop Workspace App Icons (Desktop Only) */}
              <div className="hidden lg:block absolute inset-x-0 bottom-16 top-10 pointer-events-none z-20">
                {thoughtWorkspaces.map((node) => (
                  <ThoughtWorkspaceNode
                    key={node.id}
                    node={node}
                    isActive={node.id === activeId}
                    onClick={() => setActiveId(node.id)}
                  />
                ))}
              </div>

              {/* 4. Active Finder Window Panel (Desktop Only) */}
              <div className="hidden lg:block absolute top-[13%] right-[4%] w-[58%] h-[70%] z-30">
                <AnimatePresence mode="wait">
                  {activeId && activeWorkspace && (
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full"
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

              {/* 4. Mobile/Tablet Workspace App Grid (Hidden on Desktop) */}
              <div className="lg:hidden grid grid-cols-4 gap-3 p-2 z-20 select-none max-w-lg mx-auto">
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

              {/* 5. Switcher Dock (Desktop Only) */}
              <ThoughtDock
                workspaces={thoughtWorkspaces}
                activeId={activeId}
                onSelect={setActiveId}
              />

            </div>
          </div>

          {/* MacBook Pro Base / Opener Lip */}
          <div className="relative -mt-2 mx-auto w-[103%] left-[-1.5%] h-4 bg-gradient-to-b from-[#222221] via-[#161615] to-[#0c0c0b] rounded-b-2xl border-t border-white/10 shadow-[0_25px_40px_rgba(0,0,0,0.8)] z-10 flex justify-center pointer-events-none">
            <div className="w-24 h-2 bg-[#090909] rounded-b-lg border-b border-white/5" />
          </div>
        </div>

        {/* 6. Active Panel Mobile View (Hidden on Desktop) */}
        <div className="w-full mt-6 block lg:hidden">
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
    </section>
  );
}

export default ThoughtWorkspace;
