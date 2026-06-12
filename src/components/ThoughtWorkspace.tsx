"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { thoughtWorkspaces, getWorkspaceById } from "@/data/thought-workspaces";
import { ThoughtWorkspaceNode, getWorkspaceIcon } from "./ThoughtWorkspaceNode";
import { ThoughtDock } from "./ThoughtDock";
import { ThoughtPanel } from "./ThoughtPanel";
import { cn } from "@/lib/utils";
import { MacbookScroll } from "./ui/macbook-scroll";

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

interface ThoughtOSDesktopProps {
  activeId: string;
  setActiveId: (id: string) => void;
  activeWorkspace: any;
}

export function ThoughtOSDesktop({ activeId, setActiveId, activeWorkspace }: ThoughtOSDesktopProps) {
  return (
    <div className="relative w-[150%] h-[150%] scale-[0.6667] origin-top-left bg-[#050505] overflow-hidden p-8 select-none pointer-events-auto">
      {/* Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/75 z-0 pointer-events-none" />

      {/* Scaled container for ThoughtOS UI */}
      <div className="w-full h-full relative origin-center scale-[0.82] flex flex-col justify-between z-10">
        {/* macOS-style Menu Bar */}
        <div className="absolute left-0 right-0 top-0 z-40 flex h-10 items-center justify-between border-b border-white/10 bg-black/35 px-6 text-xs text-white/70 backdrop-blur-xl pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.25)]" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.2)]" />
            <span className="h-3 w-3 rounded-full bg-green-400/80 shadow-[0_0_10px_rgba(74,222,128,0.2)]" />
            <span className="ml-4 font-bold tracking-wider text-white/85">ThoughtOS</span>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <span className="font-semibold">Mind</span>
            <span className="font-semibold">Build</span>
            <span className="font-semibold">Ship</span>
            <span className="font-semibold">Proof</span>
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
            className="absolute left-[20%] top-[20%] h-80 w-80 rounded-full bg-amber-500/30 blur-md"
          />
          <motion.div
            variants={blobVariants}
            animate="animate2"
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[25%] bottom-[25%] h-88 w-88 rounded-full bg-yellow-400/25 blur-md"
          />
        </div>

        {/* Desktop Workspace App Icons */}
        <div className="absolute inset-x-0 bottom-24 top-14 pointer-events-none z-20">
          {thoughtWorkspaces.map((node) => (
            <ThoughtWorkspaceNode
              key={node.id}
              node={node}
              isActive={node.id === activeId}
              onClick={() => setActiveId(node.id)}
            />
          ))}
        </div>

        {/* Active Finder Window Panel */}
        <div className="absolute top-[13%] right-[4%] w-[58%] h-[70%] z-30">
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

        {/* Switcher Dock */}
        <ThoughtDock
          workspaces={thoughtWorkspaces}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </div>
  );
}

export function ThoughtWorkspace() {
  const [activeId, setActiveId] = useState<string>("ai-leverage");

  const activeWorkspace = getWorkspaceById(activeId);
  const thoughtWorkspaceScene = getAssetUrl("thought-workspace-scene.webp");

  return (
    <>
      <section
        id="thought-workspace"
        className="relative min-h-[170vh] lg:min-h-[220vh] overflow-hidden bg-black text-white"
        aria-label="Thought Workspace Section"
      >
        <div className="sticky top-0 min-h-screen overflow-hidden px-6 md:px-10 flex flex-col justify-start">
          {/* Workspace background */}
          <img
            src={thoughtWorkspaceScene}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-bottom opacity-100 brightness-105 contrast-105 pointer-events-none select-none z-0"
          />

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

          {/* Foreground content */}
          <div className="relative z-10 mx-auto w-full max-w-[1400px] flex min-h-screen flex-col items-center justify-start pt-36 md:pt-44">
            {/* Section Header */}
            <div className="mb-8 w-full grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
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

            {/* Desktop View: Interactive ThoughtOS inside MacbookScroll */}
            <div className="relative hidden lg:flex w-full max-w-4xl scale-90 md:scale-95 mx-auto mt-10 md:mt-12 items-start justify-center overflow-visible">
              <MacbookScroll
                sectionMode
                title={
                  <span className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                    From thought loops. <br /> Turning curiosity into visible proof.
                  </span>
                }
                showGradient={false}
              >
                <ThoughtOSDesktop
                  activeId={activeId}
                  setActiveId={setActiveId}
                  activeWorkspace={activeWorkspace}
                />
              </MacbookScroll>
            </div>

            {/* Mobile/Tablet Fallback View: Static Bezel Mockup with App Grid */}
            <div className="lg:hidden w-full flex flex-col items-center">
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
        </div>
      </section>
      <div className="h-24 bg-black" />
    </>
  );
}

export default ThoughtWorkspace;
