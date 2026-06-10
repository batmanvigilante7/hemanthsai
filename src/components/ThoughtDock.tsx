"use client";

import React, { ComponentType, SVGProps } from "react";
import { WorkspaceNode } from "@/data/thought-workspaces";
import { Dock, DockIcon } from "@/components/ui/magnetic-dock";
import {
  BrainCircuit,
  Eye,
  ChartNoAxes,
  Clapperboard,
  TrendingUp,
  Zap,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

interface ThoughtDockProps {
  workspaces: WorkspaceNode[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ThoughtDock({
  workspaces,
  activeId,
  onSelect,
}: ThoughtDockProps) {
  const dockMeta: Record<string, { shortLabel: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = {
    "ai-leverage": { shortLabel: "AI", Icon: BrainCircuit },
    "ux-psychology": { shortLabel: "UX", Icon: Eye },
    "startup-validation": { shortLabel: "PMF", Icon: ChartNoAxes },
    "cinematic-storytelling": { shortLabel: "Story", Icon: Clapperboard },
    "investing-mental-models": { shortLabel: "Invest", Icon: TrendingUp },
    "execution-psychology": { shortLabel: "Do", Icon: Zap },
    "product-communication": { shortLabel: "Comms", Icon: MessageSquareText },
    "personal-proof-systems": { shortLabel: "Proof", Icon: ShieldCheck },
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[90vw] hidden md:block">
      <Dock className="bg-[#10100f]/60 border-white/10 backdrop-blur-xl px-4 py-2 flex items-center justify-center gap-3">
        {workspaces.map((node) => {
          const meta = dockMeta[node.id];
          if (!meta) return null;
          const IconComponent = meta.Icon;
          const isActive = node.id === activeId;

          return (
            <DockIcon
              key={node.id}
              active={isActive}
              onClick={() => onSelect(node.id)}
              className="relative group flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Icon wrapper to allow the dot at the bottom */}
              <div className="flex flex-col items-center justify-center h-full w-full relative">
                <IconComponent className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:scale-110" />

                {/* macOS style active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                )}
              </div>

              {/* Tooltip on Dock Item Hover */}
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 bg-black/85 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-lg whitespace-nowrap z-50">
                {node.title}
              </div>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}