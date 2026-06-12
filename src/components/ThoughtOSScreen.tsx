"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThoughtOSScreenProps {
  className?: string;
}

export default function ThoughtOSScreen({ className }: ThoughtOSScreenProps) {
  const [activeTab, setActiveTab] = useState("Today");

  const sidebarItems = [
    { name: "Today", active: true },
    { name: "Ideas", active: false },
    { name: "Projects", active: false },
    { name: "Ship Log", active: false },
    { name: "Proof", active: false },
    { name: "Stack", active: false }
  ];

  const dockItems = [
    { label: "Finder", icon: "◈" },
    { label: "Mind", icon: "🧠" },
    { label: "Build", icon: "⚙️" },
    { label: "Ship", icon: "🚀" },
    { label: "Proof", icon: "📁" },
    { label: "Notes", icon: "📝" },
    { label: "Stack", icon: "⚡" }
  ];

  return (
    <div className={cn(
      "relative w-[150%] h-[150%] scale-[0.6667] origin-top-left bg-[#070708] overflow-hidden select-none pointer-events-auto font-sans",
      className
    )}>
      {/* Warm Ambient Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_65%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d] via-[#070708] to-[#040405] z-0 pointer-events-none" />

      {/* Inner Desktop Layout: Full available height */}
      <div className="relative z-10 flex h-full w-full flex-col">
        
        {/* Top Menu Bar */}
        <div className="h-8 shrink-0 border-b border-white/5 bg-black/45 px-5 text-[11px] font-semibold text-white/70 backdrop-blur-md flex items-center justify-between relative z-40">
          <div className="flex items-center gap-3">
            {/* macOS Control Dots */}
            <div className="flex gap-1.5 mr-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <span className="font-bold tracking-wider text-amber-500/90">ThoughtOS</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white font-medium cursor-pointer">Finder</span>
            <span className="cursor-pointer hover:text-white transition-colors">Mind</span>
            <span className="cursor-pointer hover:text-white transition-colors">Build</span>
            <span className="cursor-pointer hover:text-white transition-colors">Ship</span>
            <span className="cursor-pointer hover:text-white transition-colors">Proof</span>
          </div>

          <div className="font-mono text-white/45">09:41</div>
        </div>

        {/* Main Desktop Area */}
        <div className="relative flex flex-1 items-center justify-between gap-6 px-8 pt-4 pb-20 w-full">
          
          {/* Main Finder Window */}
          <div className="w-[68%] h-full bg-[#0f0f12]/75 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-40 border-r border-white/5 bg-black/20 p-3 flex flex-col gap-1.5">
              <div className="text-[10px] uppercase font-bold text-white/30 tracking-wider mb-2 px-2">Workspace</div>
              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-all flex items-center gap-2 font-medium",
                    activeTab === item.name
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    activeTab === item.name ? "bg-amber-400" : "bg-transparent"
                  )} />
                  {item.name}
                </button>
              ))}
            </div>

            {/* Window Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              {/* Window Header */}
              <div className="border-b border-white/5 pb-3">
                <h3 className="text-[10px] font-bold text-amber-500/75 uppercase tracking-[0.2em]">Command Center</h3>
                <p className="text-xs text-white/45">Personal workspace</p>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col justify-center gap-4 py-2">
                {/* Primary Card */}
                <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/[0.02] border border-amber-500/20 rounded-lg p-3.5 shadow-sm">
                  <div className="text-[9px] uppercase font-bold text-amber-400/80 tracking-widest mb-1">Today's Focus</div>
                  <div className="text-sm font-semibold text-white/95 leading-snug">
                    Turn curiosity into visible proof
                  </div>
                </div>

                {/* Compact Status Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 flex flex-col justify-between">
                    <span className="text-[9px] font-bold text-white/40 uppercase">Mind</span>
                    <span className="text-xs font-semibold text-white/80 mt-1">Capture</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 flex flex-col justify-between">
                    <span className="text-[9px] font-bold text-white/40 uppercase">Build</span>
                    <span className="text-xs font-semibold text-white/80 mt-1">Prototype</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 flex flex-col justify-between">
                    <span className="text-[9px] font-bold text-white/40 uppercase">Ship</span>
                    <span className="text-xs font-semibold text-white/80 mt-1">Publish</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Widget */}
          <div className="w-[28%] h-full bg-[#0f0f12]/45 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-[9px] uppercase font-bold text-white/40 tracking-wider mb-3">System Signal</div>
              
              <div className="flex flex-col gap-2.5">
                <div className="text-xs font-semibold text-white/80">
                  Curiosity <span className="text-amber-500/60 mx-1">→</span> System <span className="text-amber-500/60 mx-1">→</span> Output
                </div>
                
                <div className="w-full bg-white/[0.03] border border-white/5 rounded-md p-2 text-[10px] text-white/50 leading-relaxed font-mono">
                  $ thoughtOS --live
                  <br />
                  <span className="text-amber-400/80">Status: Running</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full py-1.5 px-3 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">Builder Mode</span>
            </div>
          </div>

        </div>

        {/* Dock: Absolutely pinned to bottom */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-fit bg-black/45 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3.5 shadow-2xl z-30">
          {dockItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{
                scale: 1.22,
                y: -6,
                borderColor: "rgba(245, 158, 11, 0.45)",
                backgroundColor: "rgba(245, 158, 11, 0.08)",
                boxShadow: "0 8px 20px rgba(245, 158, 11, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="h-10 w-10 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center cursor-pointer text-base transition-colors duration-200 group"
            >
              <span className="group-hover:text-amber-400 transition-colors">{item.icon}</span>
              
              {/* Optional tiny tooltip label on hover */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/85 text-white/90 text-[8px] font-bold uppercase px-2 py-0.5 rounded border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
