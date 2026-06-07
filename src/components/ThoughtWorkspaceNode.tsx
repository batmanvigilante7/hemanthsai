"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { WorkspaceNode } from "@/data/thought-workspaces";
import { ImagesBadge } from "@/components/ui/images-badge";
import { cn } from "@/lib/utils";

interface ThoughtWorkspaceNodeProps {
  node: WorkspaceNode;
  isActive: boolean;
  onClick: () => void;
}

export function ThoughtWorkspaceNode({
  node,
  isActive,
  onClick,
}: ThoughtWorkspaceNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically resolve Lucide Icon
  const IconComponent = (Icons as any)[node.iconName] || Icons.HelpCircle;

  return (
    <div
      style={{
        position: "absolute",
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className="z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Circle */}
      <motion.button
        type="button"
        onClick={onClick}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-full border bg-black/45 backdrop-blur-md transition-all duration-300 focus:outline-none md:h-14 md:w-14",
          isActive
            ? "border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            : "border-white/10 text-white/70 hover:border-white/30 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
        )}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Outer Ring for Active Node */}
        {isActive && (
          <span className="absolute -inset-1 rounded-full border border-amber-400/30 animate-pulse pointer-events-none" />
        )}

        <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
      </motion.button>

      {/* Label (Permanently visible below icon when inactive, or styled nicely) */}
      <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-center">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-200 border",
            isActive
              ? "bg-amber-400/20 border-amber-400/30 text-amber-300"
              : "bg-black/50 border-white/5 text-white/50"
          )}
        >
          {node.title}
        </span>
      </div>

      {/* Hover Info Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 mb-4 w-72 origin-bottom rounded-2xl border border-white/15 bg-[#121211]/92 p-5 text-white shadow-2xl backdrop-blur-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-amber-300/80">
                  Workspace
                </p>
                <h4 className="mt-1 text-lg font-black uppercase tracking-tight text-white">
                  {node.title}
                </h4>
              </div>

              {/* ImagesBadge Preview */}
              <ImagesBadge
                text=""
                images={node.images}
                folderSize={{ width: 28, height: 21 }}
                teaserImageSize={{ width: 18, height: 13 }}
                hoverImageSize={{ width: 44, height: 30 }}
                hoverTranslateY={-30}
                hoverSpread={18}
                hoverRotation={12}
                className="shrink-0 text-white/70 hover:text-amber-200"
              />
            </div>

            <p className="mt-3 text-xs leading-relaxed text-white/60">
              {node.description}
            </p>

            <div className="mt-4 border-t border-white/5 pt-3">
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">
                Core belief
              </p>
              <p className="mt-1 text-[11px] italic leading-normal text-amber-200/80">
                "{node.belief}"
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-wider text-white/40 border-t border-white/5 pt-3">
              <span>Tension: {node.tension}</span>
              <span className="text-amber-300/60 font-semibold">Click to activate</span>
            </div>

            {/* Little pointer triangle */}
            <div className="absolute top-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-white/15 bg-[#121211]/92" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
