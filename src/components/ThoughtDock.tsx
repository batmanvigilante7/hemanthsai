"use client";

import React from "react";
import * as Icons from "lucide-react";
import { WorkspaceNode } from "@/data/thought-workspaces";
import { Dock, DockIcon } from "@/components/ui/magnetic-dock";
import { cn } from "@/lib/utils";

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
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[90vw]">
      <Dock className="bg-black/60 border-white/10 backdrop-blur-xl px-4 py-2 flex items-center justify-center gap-3">
        {workspaces.map((node) => {
          const IconComponent = (Icons as any)[node.iconName] || Icons.HelpCircle;
          const isActive = node.id === activeId;

          return (
            <DockIcon
              key={node.id}
              active={isActive}
              onClick={() => onSelect(node.id)}
              className="relative group"
            >
              {/* Icon */}
              <IconComponent className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:scale-110" />

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
