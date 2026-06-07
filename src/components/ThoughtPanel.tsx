"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { WorkspaceNode } from "@/data/thought-workspaces";

interface ThoughtPanelProps {
  node: WorkspaceNode;
  onClose?: () => void;
}

export function ThoughtPanel({ node, onClose }: ThoughtPanelProps) {
  const IconComponent = (Icons as any)[node.iconName] || Icons.HelpCircle;

  // Generate some mock files related to the workspace to render a file tree
  const mockFilesMap: { [key: string]: string[] } = {
    "ai-leverage": ["orchestrator.py", "prompt_chains.json", "local_fallback_agent.py"],
    "execution-psychology": ["sprint_loop_21_days.md", "activation_energy_math.txt", "momentum_tracker.xlsx"],
    "personal-proof-systems": ["portfolio_hub.tsx", "proof_audits.py", "public_ship_log.json"],
    "product-communication": ["positioning_framework.md", "conversion_copywriter.txt", "demo_sequence.mp4"],
    "cinematic-storytelling": ["visual_metaphor_notes.md", "atmospherics_scene.css", "attention_beats.timeline"],
    "investing-mental-models": ["compounding_skills_log.txt", "incentives_audit.md", "optionality_allocation.xlsx"],
    "ux-psychology": ["cognitive_load_budget.xlsx", "trust_cues_ui.tsx", "thumb_ergonomics.sketch"],
    "startup-validation": ["smoke_test_landing.html", "interview_rules.md", "mvp_triage_log.txt"],
  };

  const files = mockFilesMap[node.id] || ["notes.md", "config.json"];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 50, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="noise relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0e0e0d]/90 p-6 shadow-2xl backdrop-blur-xl md:p-8"
      style={{ height: "100%" }}
    >
      {/* Decorative side line */}
      <div className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-amber-400/50 via-white/10 to-transparent" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-white/5 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/5 text-amber-300">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                Active Workspace
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                {node.title}
              </h3>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <Icons.X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Workspace details - File tree mock */}
        <div className="mt-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
            Workspace Directory
          </p>
          <div className="mt-3 space-y-2.5 rounded-2xl border border-white/5 bg-black/25 p-4 font-mono text-xs text-white/70">
            <div className="flex items-center gap-2 text-amber-300/80">
              <Icons.FolderOpen className="h-3.5 w-3.5 shrink-0" />
              <span>/src/workspaces/{node.id}/</span>
            </div>
            <div className="pl-5 space-y-2 border-l border-white/5">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 hover:text-white transition-colors duration-150 cursor-pointer">
                  <Icons.FileCode2 className="h-3.5 w-3.5 shrink-0 text-white/40" />
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Belief */}
        <div className="mt-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
            Core Thesis
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {node.belief}
          </p>
        </div>

        {/* Exploring list */}
        <div className="mt-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
            Exploration Vectors
          </p>
          <ul className="mt-3 space-y-2.5">
            {node.exploring.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-white/60">
                <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Terminal Realization card */}
      <div className="mt-8">
        <div className="rounded-2xl border border-white/10 bg-black/45 p-4 font-mono text-xs">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 text-white/30">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[9px] uppercase tracking-wider">realization.log</span>
          </div>
          <p className="mt-3 leading-relaxed text-amber-200/90 italic">
            "{node.realization}"
          </p>
        </div>

        {/* Tension Slider */}
        <div className="mt-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-white/40">
          <span>{node.tension.split(" vs. ")[0]}</span>
          <div className="relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-400 to-amber-300"
              style={{ left: "25%", right: "25%" }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border border-amber-400 bg-black" />
          </div>
          <span>{node.tension.split(" vs. ")[1]}</span>
        </div>
      </div>
    </motion.aside>
  );
}
