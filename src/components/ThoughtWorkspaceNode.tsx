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
      className="z-20 flex flex-col items-center gap-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Station Anchor: Interactive ImagesBadge Folder */}
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.14 }}
        whileTap={{ scale: 0.96 }}
        className="cursor-pointer"
      >
        <ImagesBadge
          text=""
          images={node.images}
          folderSize={{ width: 44, height: 33 }}
          teaserImageSize={{ width: 28, height: 20 }}
          hoverImageSize={{ width: 62, height: 42 }}
          hoverTranslateY={-38}
          hoverSpread={24}
          hoverRotation={15}
          className={cn(
            "transition-all duration-300",
            isActive
              ? "drop-shadow-[0_0_15px_rgba(251,191,36,0.65)]"
              : "opacity-80 hover:opacity-100"
          )}
        />
      </motion.div>

      {/* Label Capsule (Title + Tiny Metadata Icon) */}
      <motion.button
        type="button"
        onClick={onClick}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 outline-none",
          isActive
            ? "bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
            : "bg-black/60 border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"
        )}
      >
        <IconComponent className="h-3 w-3 text-current/70" />
        <span>{node.title}</span>
      </motion.button>

      {/* Hover Info Card (Tooltip) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 mb-5 w-72 origin-bottom rounded-2xl border border-white/15 bg-[#121211]/92 p-5 text-white shadow-2xl backdrop-blur-lg pointer-events-none"
          >
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-amber-300/80">
                Workspace
              </p>
              <h4 className="mt-1 text-lg font-black uppercase tracking-tight text-white">
                {node.title}
              </h4>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-white/60">
              {node.description}
            </p>

            <div className="mt-4 border-t border-white/5 pt-3">
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">
                Core thesis
              </p>
              <p className="mt-1 text-[11px] italic leading-normal text-amber-200/80">
                "{node.belief}"
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-wider text-white/40 border-t border-white/5 pt-3">
              <span>Tension: {node.tension}</span>
              <span className="text-amber-300/60 font-semibold">Click to open panel</span>
            </div>

            {/* Pointer triangle */}
            <div className="absolute top-full left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-white/15 bg-[#121211]/92" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
