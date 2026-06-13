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

const FolderIcon = ({ accentGrad }: { accentGrad: string }) => {
  return (
    <div className="relative w-11 h-9 flex items-center justify-center">
      {/* Folder Back (Warm Graphite) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3d] to-[#1e1e24] border border-white/10 rounded-[4px] shadow-md" />
      {/* Folder Tab */}
      <div className="absolute -top-[3px] left-1.5 w-4.5 h-1.5 bg-[#3a3a3d] border-t border-x border-white/10 rounded-t-[2px]" />
      {/* Accent gradient line */}
      <div className={cn("absolute top-2.5 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r", accentGrad)} />
      {/* Folder Front (Amber Glass) */}
      <div className="absolute bottom-0 inset-x-0 h-6.5 rounded-b-[4px] bg-amber-500/10 border-t border-amber-500/35 backdrop-blur-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-center">
        {/* Document peak */}
        <div className="w-6 h-3 bg-white/5 rounded-[1px] border border-white/10 -translate-y-[2px] transform -rotate-1" />
      </div>
    </div>
  );
};

interface FolderProps {
  id: string;
  title: string;
  dock: string;
  description: string;
  accentGrad: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

const DesktopFolder = ({
  title,
  description,
  accentGrad,
  isSelected,
  onSelect,
  onOpen,
}: FolderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-24 h-20 cursor-pointer group select-none"
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
      {/* Glow / Selection Highlight */}
      <div
        className={cn(
          "absolute -inset-1.5 rounded-lg transition-all duration-150 pointer-events-none",
          isSelected
            ? "bg-amber-500/15 border border-amber-500/35 shadow-[0_0_8px_rgba(245,158,11,0.2)]"
            : isHovered
            ? "bg-white/5 border border-white/5"
            : "border border-transparent"
        )}
      />

      {/* Folder body */}
      <FolderIcon accentGrad={accentGrad} />

      {/* Title */}
      <span className="mt-1 text-[10px] font-medium text-white/80 text-center tracking-tight leading-snug w-[85%] truncate drop-shadow-md">
        {title}
      </span>

      {/* Hover Description Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 top-16 left-1/2 -translate-x-1/2 w-44 p-2 bg-[#121215]/95 backdrop-blur-md border border-white/10 rounded-md shadow-xl text-center pointer-events-none"
          >
            <p className="text-[9px] text-white/90 leading-normal font-sans">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
    icon: (
      <div className={cn(
        "w-8 h-8 rounded-lg bg-gradient-to-br backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg text-white font-bold text-[9px] tracking-tight leading-none select-none",
        item.accentGrad
      )}>
        {item.dock}
      </div>
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
        "relative h-full w-full bg-[#030504] overflow-hidden select-none pointer-events-auto font-sans flex flex-col justify-between p-3.5",
        className
      )}
      onClick={() => setSelectedFolderId(null)}
    >
      {/* Warm Ambient Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.14),transparent_55%)] z-0 pointer-events-none" />

      {/* Top Menu Bar */}
      <header className="relative z-30 h-7 border border-white/5 rounded-md bg-black/45 backdrop-blur flex items-center justify-between px-3 text-[10px] font-semibold text-white/70 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          {/* macOS Control Dots */}
          <div className="flex gap-1 mr-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-bold tracking-wider text-amber-500/90 ml-1">ThoughtOS</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-[9px]"
          >
            <span>⌘ Search</span>
          </button>
        </div>

        <div className="font-mono text-white/45">09:41</div>
      </header>

      {/* Main Desktop Area */}
      <main className="relative flex-1 z-20 pt-6 pb-16 flex items-center justify-center min-h-0">
        {/* Desktop folders grid: blurred/translucent when a window is open */}
        <div className={cn(
          "grid grid-cols-4 grid-rows-2 gap-x-8 gap-y-4 max-w-xl mx-auto justify-items-center transition-all duration-300",
          isWindowOpen ? "opacity-25 blur-[1px] pointer-events-none scale-98" : "opacity-100 blur-0 pointer-events-auto scale-100"
        )}>
          {thoughtOSItems.map((folder) => {
            const isSelected = selectedFolderId === folder.id;
            return (
              <DesktopFolder
                key={folder.id}
                id={folder.id}
                title={folder.title}
                dock={folder.dock}
                description={folder.description}
                accentGrad={folder.accentGrad}
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
              className="absolute top-[32px] bottom-[54px] inset-x-3.5 z-30 flex flex-col bg-[#0b0c10]/95 border border-white/10 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden"
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
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-fit z-40 transform scale-[0.8] origin-bottom select-none">
        <FloatingDock items={dockItems} desktopClassName="bg-black/55 backdrop-blur-md border border-white/10 p-2 h-14" />
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
