"use client";

import { motion } from "framer-motion";
import { WorkspaceNode } from "@/data/thought-workspaces";

interface ConnectionLinesProps {
  workspaces: WorkspaceNode[];
  activeId: string;
}

export function ConnectionLines({ workspaces, activeId }: ConnectionLinesProps) {
  // Generate all connection lines (avoiding duplicates)
  const allLines: { from: WorkspaceNode; to: WorkspaceNode; key: string }[] = [];
  const lineKeys = new Set<string>();

  workspaces.forEach((fromNode) => {
    fromNode.connections.forEach((toId) => {
      const toNode = workspaces.find((w) => w.id === toId);
      if (toNode) {
        // Create sorted key to keep lines unique in registry
        const sortedKey = [fromNode.id, toNode.id].sort().join("-");
        if (!lineKeys.has(sortedKey)) {
          lineKeys.add(sortedKey);
          allLines.push({ from: fromNode, to: toNode, key: sortedKey });
        }
      }
    });
  });

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>



      {/* Render active lines with motion and glow */}
      {allLines.map(({ from, to, key }) => {
        const isActive = from.id === activeId || to.id === activeId;
        if (!isActive) return null;

        const fromPos = from.position;
        const toPos = to.position;

        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const controlX = midX + (50 - midX) * 0.15;
        const controlY = midY + (50 - midY) * 0.15;

        return (
          <g key={`active-${key}`}>
            {/* Ambient wide glow line */}
            <motion.path
              d={`M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`}
              fill="none"
              stroke="rgba(251, 191, 36, 0.2)"
              strokeWidth="1.8"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Core glowing line with flow animation */}
            <motion.path
              d={`M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`}
              fill="none"
              stroke="url(#activeGradient)"
              strokeWidth="0.85"
              initial={{ pathLength: 0, strokeDasharray: "4 12", strokeDashoffset: 0 }}
              animate={{
                pathLength: 1,
                strokeDashoffset: [0, -32],
              }}
              transition={{
                pathLength: { duration: 0.8, ease: "easeOut" },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
