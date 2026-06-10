"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { WorkspaceNode } from "@/data/thought-workspaces";
import { cn } from "@/lib/utils";

interface ThoughtWorkspaceNodeProps {
  node: WorkspaceNode;
  isActive: boolean;
  onClick: () => void;
}

export function getWorkspaceIcon(iconName: string) {
  const safeMapping: Record<string, string> = {
    ChartNoAxesCombined: "BarChart3",
    MessageSquareText: "MessageSquare",
    BrainCircuit: "BrainCircuit",
    Eye: "Eye",
    Clapperboard: "Clapperboard",
    TrendingUp: "TrendingUp",
    Zap: "Zap",
    ShieldCheck: "ShieldCheck",
  };
  const resolvedName = safeMapping[iconName] || iconName;
  return (Icons as any)[resolvedName] || Icons.HelpCircle;
}

export function ThoughtWorkspaceNode({
  node,
  isActive,
  onClick,
}: ThoughtWorkspaceNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = getWorkspaceIcon(node.iconName);

  return (
    <div
      style={{
        position: "absolute",
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className="z-20 select-none hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border border-transparent w-24 text-center transition-all duration-200 outline-none cursor-pointer",
          isActive
            ? "bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
            : "hover:bg-white/5 hover:border-white/10"
        )}
      >
        {/* macOS Style Icon Squircle */}
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 relative",
            isActive
              ? "bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-amber-500/20"
              : "bg-gradient-to-br from-[#222221] to-[#121211] border border-white/10 text-amber-400/90 hover:text-amber-300"
          )}
        >
          <IconComponent className="h-6.5 w-6.5" />
          
          {/* Active Mini Dot in Icon Corner */}
          {isActive && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 border-2 border-[#161615] rounded-full animate-pulse z-35" />
          )}
        </div>

        {/* Label with Apple text shadow */}
        <span
          className={cn(
            "text-[10px] font-extrabold tracking-wide leading-tight line-clamp-2 select-none",
            isActive ? "text-amber-300" : "text-white/80"
          )}
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
        >
          {node.title}
        </span>
      </motion.button>

      {/* Hover Info Tooltip */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -8, x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 mb-3.5 w-56 origin-bottom rounded-xl border border-white/10 bg-[#121211]/95 p-3 text-white shadow-xl backdrop-blur-md pointer-events-none z-50"
          >
            <h5 className="text-[10px] font-bold uppercase tracking-tight text-amber-300">
              {node.title}
            </h5>
            <p className="mt-1 text-[10px] leading-relaxed text-white/60">
              {node.description}
            </p>
            {/* Pointer triangle */}
            <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-white/10 bg-[#121211]/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
