"use client";

import React from "react";
import {
  BrainCircuit,
  ChartNoAxesCombined,
  Clapperboard,
  Eye,
  MessageSquareText,
  ShieldCheck,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { WorkspaceNode } from "@/data/thought-workspaces";
import { Dock, DockIcon } from "@/components/ui/magnetic-dock";
import { cn } from "@/lib/utils";

interface ThoughtDockProps {
  workspaces: WorkspaceNode[];
  activeId: string;
  onSelect: (id: string) => void;
}

const dockMeta: Record<string, { shortLabel: string; Icon: LucideIcon }> = {
  "ai-leverage": {
    shortLabel: "AI",
    Icon: Brain