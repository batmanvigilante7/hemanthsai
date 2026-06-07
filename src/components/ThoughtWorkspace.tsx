"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { thoughtWorkspaces, getWorkspaceById } from "@/data/thought-workspaces";
import { ThoughtWorkspaceNode } from "./ThoughtWorkspaceNode";
import { ConnectionLines } from "./ConnectionLines";
import { ThoughtDock } from "./ThoughtDock";
import { ThoughtPanel } from "./ThoughtPanel";

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

  const activeWorkspace = getWorkspaceById(activeId) || thoughtWorkspaces[0];

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
              The desks inside my mind.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-white/55 md:text-lg">
              A dynamic visual constellation of the workflows, systems, and
              obsessions I return to while building with AI, code, design, and storytelling.
            </p>
          </div>
        </div>

        {/* Constellation Canvas & Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.28fr_0.72fr] gap-8 items-stretch">
          {/* Left Column: Constellation Board */}
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/40 shadow-2xl aspect-[4/3] w-full min-h-[380px] sm:min-h-[480px] md:min-h-[580px]">
            {/* 1. Background Image Atmosphere */}
            <img
              src={getAssetUrl("thought-workspace-bg.webp")}
              alt="Cinematic thought workspace backdrop"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.38] mix-blend-lighten pointer-events-none select-none z-0"
            />

            {/* Ambient Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/75 z-0 pointer-events-none" />

            {/* 2. Gooey expansion backgrounds */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20"
              style={{ filter: "url(#gooey-blend)" }}
            >
              <motion.div
                variants={blobVariants}
                animate="animate1"
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[30%] top-[30%] h-44 w-44 rounded-full bg-amber-500/30 blur-md"
              />
              <motion.div
                variants={blobVariants}
                animate="animate2"
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[30%] bottom-[30%] h-48 w-48 rounded-full bg-yellow-400/25 blur-md"
              />
              <motion.div
                variants={blobVariants}
                animate="animate3"
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[40%] bottom-[25%] h-40 w-40 rounded-full bg-amber-600/20 blur-md"
              />
            </div>

            {/* 3. SVG Connection Lines */}
            <ConnectionLines workspaces={thoughtWorkspaces} activeId={activeId} />

            {/* 4. Constellation Nodes */}
            {thoughtWorkspaces.map((node) => (
              <ThoughtWorkspaceNode
                key={node.id}
                node={node}
                isActive={node.id === activeId}
                onClick={() => setActiveId(node.id)}
              />
            ))}

            {/* 5. Switcher Dock */}
            <ThoughtDock
              workspaces={thoughtWorkspaces}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>

          {/* Right Column: Sliding Active File Panel */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <ThoughtPanel key={activeId} node={activeWorkspace} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThoughtWorkspace;
