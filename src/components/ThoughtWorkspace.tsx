"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { thoughtWorkspaces, getWorkspaceById } from "@/data/thought-workspaces";
import { ThoughtWorkspaceNode, getWorkspaceIcon } from "./ThoughtWorkspaceNode";
import { ThoughtPanel } from "./ThoughtPanel";
import { cn } from "@/lib/utils";
import { MacbookScroll } from "./ui/macbook-scroll";
import ThoughtOSScreen from "./ThoughtOSScreen";
import { ImagesBadge } from "./ui/images-badge";

interface TopicData {
  title: string;
  files: string[];
  purpose: string;
  gradientClass: string;
  accentHex: string;
  dock: string;
}

const getAssetUrl = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

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

export function ThoughtWorkspace() {
  const [activeId, setActiveId] = useState<string>("ai-leverage");
  const [hoveredTopic, setHoveredTopic] = useState<TopicData | null>(null);
  const [activeTopic, setActiveTopic] = useState<TopicData | null>(null);
  const [badgeHovered, setBadgeHovered] = useState<boolean>(false);

  const activeWorkspace = getWorkspaceById(activeId);
  const thoughtWorkspaceScene = getAssetUrl("thought-workspace-scene.webp");

  return (
    <>
      <section
        id="thought-workspace"
        className="relative min-h-[120vh] overflow-visible bg-black text-white px-6 md:px-10"
        aria-label="Thought Workspace Section"
      >
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
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex min-h-screen flex-col items-center justify-start pt-40 md:pt-48">
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
          <div className="relative hidden lg:flex w-full max-w-4xl mx-auto mt-24 md:mt-32 scale-[0.92] origin-top items-start justify-center overflow-visible z-10">
            {/* Left External Panel */}
            <AnimatePresence>
              {(hoveredTopic || activeTopic) && (
                <motion.div
                  initial={{ opacity: 0, x: -40, y: "-50%" }}
                  animate={{ opacity: 1, x: 0, y: "-50%" }}
                  exit={{ opacity: 0, x: -40, y: "-50%" }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-full mr-12 top-[60%] -translate-y-1/2 z-30 hidden xl:flex flex-col w-52 bg-black/65 backdrop-blur-2xl border border-white/10 rounded-xl p-4.5 shadow-[0_25px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.05)] text-left"
                >
                  <div 
                    className="h-[2.5px] w-8 rounded-full mb-3 shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300"
                    style={{ backgroundColor: (hoveredTopic || activeTopic)?.accentHex }}
                  />
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/80 mb-1">
                    Files
                  </div>
                  <div className="text-[12px] font-black text-white mb-3 tracking-tight">
                    {(hoveredTopic || activeTopic)?.title}
                  </div>
                  <ul className="space-y-2.5">
                    {(hoveredTopic || activeTopic)?.files.map((file, idx) => (
                      <li 
                        key={idx} 
                        className={cn(
                          "flex items-start gap-2 text-[10px] font-semibold leading-tight transition-all duration-300",
                          badgeHovered ? "text-amber-400 scale-[1.04] translate-x-1.5" : "text-white/70"
                        )}
                      >
                        <span className="text-amber-500 mt-0.5 text-[8px]">📄</span>
                        <span>{file}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <MacbookScroll
              sectionMode
              title={
                <span className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                  From thought loops. <br /> Turning curiosity into visible proof.
                </span>
              }
              showGradient={false}
            >
              <ThoughtOSScreen 
                onHoverFolder={setHoveredTopic}
                onSelectFolder={setActiveTopic}
              />
            </MacbookScroll>

            {/* Right External Panel */}
            <AnimatePresence>
              {(hoveredTopic || activeTopic) && (
                <motion.div
                  initial={{ opacity: 0, x: 40, y: "-50%" }}
                  animate={{ opacity: 1, x: 0, y: "-50%" }}
                  exit={{ opacity: 0, x: 40, y: "-50%" }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-full ml-12 top-[60%] -translate-y-1/2 z-30 hidden xl:flex flex-col w-56 bg-black/65 backdrop-blur-2xl border border-white/10 rounded-xl p-4.5 shadow-[0_25px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.05)] text-left"
                >
                  <div 
                    className="h-[2.5px] w-8 rounded-full mb-3 shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300"
                    style={{ backgroundColor: (hoveredTopic || activeTopic)?.accentHex }}
                  />
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/80 mb-1">
                    Folder Signal
                  </div>
                  <div className="text-[12px] font-black text-white mb-1 tracking-tight">
                    {(hoveredTopic || activeTopic)?.title}
                  </div>
                  <div className="text-[8px] text-amber-500/80 font-mono font-bold mb-3 tracking-wide uppercase">
                    {(hoveredTopic || activeTopic)?.files.length} systems registered
                  </div>
                  
                  <p className="text-[10px] text-white/55 leading-relaxed font-semibold mb-4 italic pl-2 border-l border-white/15">
                    "{(hoveredTopic || activeTopic)?.purpose}"
                  </p>

                  <div className="border-t border-white/5 pt-3.5 mt-auto flex items-center justify-between">
                    <span className="text-[8.5px] uppercase tracking-wider text-white/40 font-black">Signal Stack</span>
                    <div 
                      onMouseEnter={() => setBadgeHovered(true)} 
                      onMouseLeave={() => setBadgeHovered(false)}
                      className="scale-90 origin-right transition-transform"
                    >
                      <ImagesBadge
                        text=""
                        images={[
                          getDocSVG((hoveredTopic || activeTopic)!.accentHex, `${(hoveredTopic || activeTopic)!.title}-doc-1`),
                          getDocSVG((hoveredTopic || activeTopic)!.accentHex, `${(hoveredTopic || activeTopic)!.title}-doc-2`),
                          getDocSVG((hoveredTopic || activeTopic)!.accentHex, `${(hoveredTopic || activeTopic)!.title}-doc-3`),
                        ]}
                        folderSize={{ width: 18, height: 14 }}
                        teaserImageSize={{ width: 12, height: 9 }}
                        hoverImageSize={{ width: 44, height: 32 }}
                        hoverTranslateY={-32}
                        hoverSpread={16}
                        folderColorClass={(hoveredTopic || activeTopic)!.gradientClass}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
      </section>
      <div className="h-[60vh] bg-black" />
    </>
  );
}

export default ThoughtWorkspace;
