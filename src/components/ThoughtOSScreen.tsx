"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FloatingDock } from "@/components/ui/floating-dock";
import { ImagesBadge } from "@/components/ui/images-badge";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface ThoughtOSScreenProps {
  className?: string;
}

const thoughtOSItems = [
  {
    id: "ai-workflows",
    title: "AI Workflows",
    dock: "AI",
    description: "I use AI to think, code, critique, organize, and move faster without outsourcing my judgment.",
    accentGrad: "from-violet-500 to-blue-500",
    gradientClass: "from-violet-600/80 via-blue-600/80 to-blue-700/85",
    accentClass: "bg-violet-300 shadow-violet-500/50",
    modules: [
      { title: "Prompt Systems", description: "Designing structural prompt chains and context-dense inputs." },
      { title: "AI Coding", description: "Automating generation, validation, and self-correction cycles." },
      { title: "Research Loops", description: "Using agent networks to compile literature and extract key metrics." }
    ],
    stack: ["ChatGPT", "Claude", "Gemini", "Ollama"]
  },
  {
    id: "building-apps",
    title: "Building Apps",
    dock: "Apps",
    description: "I turn rough ideas into interfaces, prototypes, and working products people can try.",
    accentGrad: "from-sky-400 to-cyan-500",
    gradientClass: "from-sky-500/80 via-cyan-500/80 to-blue-600/85",
    accentClass: "bg-cyan-300 shadow-cyan-400/50",
    modules: [
      { title: "Drafting & Scoping", description: "Creating high-fidelity interactive wireframes and scoping initial utility loops." },
      { title: "Frontend UI", description: "Structuring component-driven type-safe frontend UI." },
      { title: "Tooling Loops", description: "Optimizing dev servers, bundling, and hot-reloading configurations." }
    ],
    stack: ["React", "TS", "Tailwind", "GitHub"]
  },
  {
    id: "user-experience",
    title: "User Experience",
    dock: "UX",
    description: "I care about making products feel clear, useful, smooth, and easy to trust.",
    accentGrad: "from-pink-500 to-rose-500",
    gradientClass: "from-pink-500/80 via-rose-500/80 to-red-500/85",
    accentClass: "bg-rose-300 shadow-rose-400/50",
    modules: [
      { title: "Clarity & Friction", description: "Simplifying user actions to remove cognitive load and make flows self-explanatory." },
      { title: "Trust Dynamics", description: "Implementing skeletal previews and clear, optimistic state transitions." },
      { title: "Motion Systems", description: "Choreographing reactive animations that guide the user's attention." }
    ],
    stack: ["Figma", "Framer", "HIG", "Refero"]
  },
  {
    id: "product-ideas",
    title: "Product Ideas",
    dock: "Ideas",
    description: "I study problems, shape solutions, and test whether an idea is actually worth building.",
    accentGrad: "from-amber-400 to-orange-500",
    gradientClass: "from-amber-500/80 via-orange-500/80 to-red-600/85",
    accentClass: "bg-amber-300 shadow-amber-400/50",
    modules: [
      { title: "Problem Framing", description: "Pinpointing high-value user bottlenecks before writing database schemas." },
      { title: "MVP Scope Cuts", description: "Aggressively separating must-haves from nice-to-haves to ship faster." },
      { title: "Validation Tests", description: "Measuring actual demand using landing page waitlists and interviews." }
    ],
    stack: ["PMF", "MVP", "JTBD", "Feedback"]
  },
  {
    id: "storytelling",
    title: "Storytelling",
    dock: "Story",
    description: "I use words, visuals, and metaphors to make ideas easier to understand, remember, and share.",
    accentGrad: "from-fuchsia-500 to-purple-600",
    gradientClass: "from-fuchsia-500/80 via-purple-600/80 to-indigo-700/85",
    accentClass: "bg-fuchsia-300 shadow-fuchsia-400/50",
    modules: [
      { title: "Narrative Hooks", description: "Writing copy that focuses on user transformation and crisis first." },
      { title: "Visual Metaphors", description: "Using simple physical analogies to explain complex codebase structures." },
      { title: "Content Sprints", description: "Maintaining public build logs and release walkthrough videos." }
    ],
    stack: ["Writing", "Cinema", "Metaphor", "Voice"]
  },
  {
    id: "investing-ideas",
    title: "Investing Ideas",
    dock: "Invest",
    description: "I study value, risk, incentives, patience, and compounding to think better long-term.",
    accentGrad: "from-emerald-500 to-lime-500",
    gradientClass: "from-emerald-500/80 via-teal-500/80 to-lime-600/85",
    accentClass: "bg-emerald-300 shadow-emerald-400/50",
    modules: [
      { title: "Compounding Assets", description: "Writing reusable code libraries that save future developer months." },
      { title: "Incentive Audits", description: "Analyzing user motivation to align product loops with behaviors." },
      { title: "Margin of Safety", description: "Evaluating time budgets and scoping fallbacks to prevent project failure." }
    ],
    stack: ["Value", "Risk", "Moat", "Time"]
  },
  {
    id: "getting-things-done",
    title: "Getting Things Done",
    dock: "Done",
    description: "I use routines, checklists, sprints, and feedback loops to convert plans into progress.",
    accentGrad: "from-blue-500 to-indigo-600",
    gradientClass: "from-blue-600/80 via-indigo-600/80 to-indigo-800/85",
    accentClass: "bg-blue-300 shadow-blue-400/50",
    modules: [
      { title: "Checklist Scaffolds", description: "Breaking down tasks into clear steps to bypass decision paralysis." },
      { title: "21-Day Sprints", description: "Forcing work scopes into short, high-intensity shipping loops." },
      { title: "Routines & Energy", description: "Minimizing startup energy thresholds to keep daily developer momentum." }
    ],
    stack: ["Tasks", "Systems", "Focus", "Review"]
  },
  {
    id: "visible-progress",
    title: "Visible Progress",
    dock: "Proof",
    description: "I document projects, lessons, experiments, and outcomes so growth becomes visible proof.",
    accentGrad: "from-yellow-400 to-amber-500",
    gradientClass: "from-yellow-500/80 via-amber-500/80 to-orange-500/85",
    accentClass: "bg-yellow-300 shadow-yellow-400/50",
    modules: [
      { title: "Build Logging", description: "Writing down weekly problems, pivots, lessons, and project milestones." },
      { title: "Clickable Demos", description: "Hosting instantly testable sandboxes to prove that the code actually compiles." },
      { title: "Evidence Trails", description: "Publishing open-source code repositories and screen walk-through videos." }
    ],
    stack: ["GitHub", "Demos", "Case Studies", "Progress"]
  }
];

const tagColors: Record<string, { from: string; to: string }> = {
  ChatGPT: { from: "#10a37f", to: "#059669" },
  Claude: { from: "#d97706", to: "#b45309" },
  Gemini: { from: "#2563eb", to: "#7c3aed" },
  Ollama: { from: "#1f2937", to: "#111827" },
  React: { from: "#0284c7", to: "#0369a1" },
  TS: { from: "#2563eb", to: "#1d4ed8" },
  TypeScript: { from: "#2563eb", to: "#1d4ed8" },
  Tailwind: { from: "#0d9488", to: "#0f766e" },
  Vite: { from: "#7c3aed", to: "#f59e0b" },
  GitHub: { from: "#1f2937", to: "#111827" },
  Figma: { from: "#ea580c", to: "#d97706" },
  Framer: { from: "#0055ff", to: "#000000" },
  HIG: { from: "#4b5563", to: "#1f2937" },
  Refero: { from: "#db2777", to: "#9d174d" },
  PMF: { from: "#059669", to: "#15803d" },
  MVP: { from: "#eab308", to: "#ca8a04" },
  JTBD: { from: "#7c3aed", to: "#5b21b6" },
  Feedback: { from: "#ea580c", to: "#c2410c" },
  Writing: { from: "#4b5563", to: "#1f2937" },
  Cinema: { from: "#ef4444", to: "#b91c1c" },
  Metaphor: { from: "#a855f7", to: "#7e22ce" },
  Voice: { from: "#eab308", to: "#ca8a04" },
  Value: { from: "#eab308", to: "#ca8a04" },
  Risk: { from: "#ef4444", to: "#dc2626" },
  Moat: { from: "#2563eb", to: "#1d4ed8" },
  Time: { from: "#059669", to: "#15803d" },
  Tasks: { from: "#059669", to: "#047857" },
  Systems: { from: "#2563eb", to: "#0284c7" },
  Focus: { from: "#ec4899", to: "#db2777" },
  Review: { from: "#eab308", to: "#ca8a04" },
  Demos: { from: "#ea580c", to: "#b45309" },
  "Case Studies": { from: "#4f46e5", to: "#3730a3" },
  Progress: { from: "#059669", to: "#15803d" }
};

const getGradientSVG = (label: string, fromColor: string, toColor: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
    <defs>
      <linearGradient id="grad-${label.replace(/[^a-zA-Z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${fromColor}" />
        <stop offset="100%" stop-color="${toColor}" />
      </linearGradient>
    </defs>
    <rect width="200" height="150" rx="12" fill="url(#grad-${label.replace(/[^a-zA-Z0-9]/g, '')})" />
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="18">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const AppIcon = ({
  dockText,
  gradientClass,
  accentClass,
  size = "desktop",
}: {
  dockText: string;
  gradientClass: string;
  accentClass: string;
  size?: "desktop" | "dock";
}) => {
  const isDesktop = size === "desktop";
  return (
    <div className="relative flex items-center justify-center overflow-hidden select-none rounded-xl w-full h-full">
      {/* Base Gradient Surface */}
      <div className={cn("absolute inset-0 bg-gradient-to-br border border-white/20 backdrop-blur-md", gradientClass)} />
      
      {/* Gloss reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
      <div className="absolute -top-[60%] -left-[60%] w-[220%] h-[220%] bg-gradient-to-b from-white/10 to-transparent rotate-30 pointer-events-none" />
      
      {/* Inner highlight shadow */}
      <div className="absolute inset-[0.5px] rounded-[inherit] border border-white/25 pointer-events-none shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.45)]" />
      
      {/* Colored accent strip */}
      <div className={cn("absolute bottom-1.5 h-[2px] w-5 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.55)]", accentClass)} />
      
      {/* Display text */}
      <span className={cn(
        "relative z-10 font-black tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]",
        isDesktop ? "text-[9px]" : "text-[8px]"
      )}>
        {dockText}
      </span>
      
      {/* Bottom gradient shadow */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
    </div>
  );
};

interface FolderProps {
  id: string;
  title: string;
  dockText: string;
  description: string;
  gradientClass: string;
  accentClass: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

const DesktopFolder = ({
  title,
  dockText,
  description,
  gradientClass,
  accentClass,
  isSelected,
  onSelect,
  onOpen,
}: FolderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayTitle = title === "Getting Things Done" ? "Getting Done" : title;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center w-[74px] h-[72px] cursor-pointer group select-none"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Translucent Selection Rectangle Behind Icon + Label */}
      <div
        className={cn(
          "absolute -inset-x-2 -inset-y-1.5 rounded-lg transition-all duration-200 pointer-events-none",
          isSelected
            ? "bg-amber-500/10 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]"
            : isHovered
            ? "bg-white/5 border border-white/10"
            : "border border-transparent"
        )}
      />

      {/* Dimensional Glass App Tile */}
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* Glow behind the active selection */}
        {isSelected && (
          <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-md scale-120 pointer-events-none" />
        )}
        
        {/* The App Icon */}
        <AppIcon 
          dockText={dockText}
          gradientClass={gradientClass}
          accentClass={accentClass}
          size="desktop"
        />
      </div>

      {/* Label */}
      <span className="mt-2 text-[9px] font-bold text-white/90 text-center tracking-tight leading-none w-full truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] select-none">
        {displayTitle}
      </span>

      {/* Hover Description Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 top-14 left-1/2 -translate-x-1/2 w-40 p-2 bg-[#121215]/95 backdrop-blur-md border border-white/10 rounded-md shadow-xl text-center pointer-events-none"
          >
            <p className="text-[8px] text-white/90 leading-normal font-sans">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ThoughtOSScreen({ className }: ThoughtOSScreenProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Command shortcut list (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Enter key opens selected folder
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && selectedFolderId) {
        setActiveFolderId(selectedFolderId);
        setIsWindowOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFolderId]);

  // Entrance animation: open "AI Workflows" by default after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveFolderId("ai-workflows");
      setSelectedFolderId("ai-workflows");
      setIsWindowOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const activeFolder = thoughtOSItems.find((f) => f.id === activeFolderId);

  // Dock items
  const dockItems = thoughtOSItems.map((item) => ({
    title: item.title,
    isActive: activeFolderId === item.id,
    icon: (
      <AppIcon 
        dockText={item.dock}
        gradientClass={item.gradientClass}
        accentClass={item.accentClass}
        size="dock"
      />
    ),
    href: `#folder-${item.id}`,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveFolderId(item.id);
      setSelectedFolderId(item.id);
      setIsWindowOpen(true);
    }
  }));

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden select-none pointer-events-auto font-sans flex flex-col justify-between p-3.5 transition-all duration-300",
        className
      )}
      onClick={() => setSelectedFolderId(null)}
      style={{
        backgroundColor: "#111215",
        backgroundImage: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 50%),
          radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.16), transparent 65%),
          radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.18), transparent 55%),
          radial-gradient(circle at 85% 85%, rgba(139, 92, 246, 0.1), transparent 50%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")
        `
      }}
    >
      {/* Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)] z-0 pointer-events-none" />

      {/* Large amber lighting glow behind folders */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[64px] z-0 pointer-events-none" />

      {/* Top Menu Bar */}
      <header className="relative z-30 h-7 border border-white/10 rounded-md bg-black/55 backdrop-blur-md flex items-center justify-between px-3 text-[9px] font-medium text-white/80 shadow-md shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          {/* macOS Control Dots */}
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/60 border border-rose-500/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60 border border-amber-500/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 border border-emerald-500/20" />
          </div>
          <span className="font-bold tracking-wide text-amber-400/90 ml-1 select-none">ThoughtOS</span>
        </div>

        {/* Clickable search pill */}
        <div className="flex items-center">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/12 hover:border-white/20 active:scale-95 text-white/70 hover:text-white transition-all cursor-pointer text-[8px] tracking-wide"
          >
            <span className="text-[8px] opacity-75">🔍</span>
            <span>Search</span>
            <span className="text-[7px] text-white/45 bg-white/10 px-1 rounded">⌘K</span>
          </button>
        </div>

        <div className="font-sans font-medium text-white/50 tracking-tight text-[8.5px]">09:41 AM</div>
      </header>

      {/* Main Desktop Area */}
      <main className="relative flex-1 z-20 pt-6 pb-16 flex items-center justify-center min-h-0">
        {/* Desktop folders grid: blurred/translucent when a window is open */}
        <div className={cn(
          "grid grid-cols-4 grid-rows-2 gap-x-10 gap-y-6 max-w-2xl mx-auto justify-items-center transition-all duration-350 ease-out",
          isWindowOpen ? "opacity-15 blur-[2px] pointer-events-none scale-[0.96]" : "opacity-100 blur-0 pointer-events-auto scale-100"
        )}>
          {thoughtOSItems.map((folder) => {
            const isSelected = selectedFolderId === folder.id;
            return (
              <DesktopFolder
                key={folder.id}
                id={folder.id}
                title={folder.title}
                dockText={folder.dock}
                description={folder.description}
                gradientClass={folder.gradientClass}
                accentClass={folder.accentClass}
                isSelected={isSelected}
                onSelect={() => setSelectedFolderId(folder.id)}
                onOpen={() => {
                  setActiveFolderId(folder.id);
                  setSelectedFolderId(folder.id);
                  setIsWindowOpen(true);
                }}
              />
            );
          })}
        </div>

        {/* Finder-style Window Overlay */}
        <AnimatePresence>
          {isWindowOpen && activeFolderId && activeFolder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[32px] bottom-[54px] inset-x-3.5 z-30 flex flex-col bg-[#0b0c10]/95 border border-white/10 rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Header */}
              <div className="h-8 border-b border-white/5 bg-black/40 flex items-center justify-between px-3 text-[10px] text-white/70 select-none">
                {/* Control Dots */}
                <div className="flex gap-1.5 w-16">
                  <button
                    onClick={() => setIsWindowOpen(false)}
                    className="h-2.5 w-2.5 rounded-full bg-rose-500 border border-rose-600/50 flex items-center justify-center group/btn cursor-pointer"
                  >
                    <span className="text-[6px] text-rose-950 font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity">✕</span>
                  </button>
                  <button
                    onClick={() => setIsWindowOpen(false)}
                    className="h-2.5 w-2.5 rounded-full bg-amber-500 border border-amber-600/50 flex items-center justify-center group/btn cursor-pointer"
                  >
                    <span className="text-[6px] text-amber-950 font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity">−</span>
                  </button>
                  <button
                    className="h-2.5 w-2.5 rounded-full bg-emerald-500 border border-emerald-600/50 flex items-center justify-center group/btn cursor-pointer"
                  >
                    <span className="text-[6px] text-emerald-950 font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity">＋</span>
                  </button>
                </div>

                {/* Window Title */}
                <div className="flex items-center gap-1.5 font-bold tracking-tight">
                  <span className="text-xs">📁</span>
                  <span>{activeFolder.title}</span>
                </div>

                {/* Right Mock Buffer */}
                <div className="w-16 flex justify-end">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Active</span>
                </div>
              </div>

              {/* Window Content Pane */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 flex flex-col justify-between bg-[#040406]/40 h-full space-y-3 font-sans">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xs font-black text-amber-400 leading-snug tracking-tight uppercase">
                      {activeFolder.title}
                    </h3>
                    <p className="text-[8px] text-white/60 leading-relaxed italic border-l border-amber-500/35 pl-1.5 mt-0.5">
                      "{activeFolder.description}"
                    </p>
                  </div>

                  {/* 3 Modules Row */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {activeFolder.modules.map((mod, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-white/5 bg-[#0f1015] hover:border-amber-500/20 transition-colors duration-200 flex flex-col justify-between h-[100px]"
                      >
                        <div>
                          <h4 className="text-[9px] font-bold text-amber-400 leading-tight">{mod.title}</h4>
                          <p className="text-[8.5px] text-white/50 leading-relaxed mt-1 line-clamp-4">{mod.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom capability stack tool representation */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500/80">Stack:</span>
                    <div className="flex gap-1">
                      {activeFolder.stack.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[7px] text-white/60 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="scale-75 origin-right flex items-center justify-end">
                    <ImagesBadge
                      text="Stack Showcase"
                      images={activeFolder.stack.map(tag => getGradientSVG(tag, tagColors[tag]?.from || '#1f2937', tagColors[tag]?.to || '#111827'))}
                      folderSize={{ width: 20, height: 15 }}
                      teaserImageSize={{ width: 16, height: 11 }}
                      hoverImageSize={{ width: 60, height: 42 }}
                      hoverTranslateY={-45}
                      hoverSpread={20}
                      className="text-white/80 font-bold"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Dock: Absolutely pinned to bottom */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-fit z-40 transform scale-[0.85] origin-bottom select-none">
        <FloatingDock 
          items={dockItems} 
          desktopClassName="bg-black/40 backdrop-blur-2xl border border-white/15 p-2 h-14 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]" 
        />
      </div>

      {/* Command dialog palette search */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen} title="ThoughtOS Search" description="Access your thinking nodes.">
        <div className="bg-[#0f1015] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <CommandInput placeholder="Search thought spaces..." className="text-white bg-transparent border-0" />
          <CommandList className="border-t border-white/5 max-h-56 bg-black/40 font-sans">
            <CommandEmpty className="text-white/40 text-xs p-4">No results found.</CommandEmpty>
            <CommandGroup heading="ThoughtOS Nodes" className="text-white/50 text-[10px]">
              {thoughtOSItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => {
                    setActiveFolderId(item.id);
                    setSelectedFolderId(item.id);
                    setIsWindowOpen(true);
                    setSearchOpen(false);
                  }}
                  className="hover:bg-amber-500/10 text-white/90 cursor-pointer flex items-center justify-between text-xs px-3 py-2 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-amber-500/80">📁</span>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-white/30 font-mono uppercase bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    {item.dock}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </div>
  );
}
