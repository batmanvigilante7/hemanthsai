"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { WorkspaceNode, thoughtWorkspaces } from "@/data/thought-workspaces";
import { ImagesBadge } from "@/components/ui/images-badge";
import { getWorkspaceIcon } from "./ThoughtWorkspaceNode";

interface ThoughtPanelProps {
  node: WorkspaceNode;
  onClose?: () => void;
  onSelectWorkspace?: (id: string) => void;
}

type FileItem = {
  name: string;
  type: "file" | "folder";
  icon: any;
  id: "thesis" | "explorations" | "realization" | "previews";
};

export function ThoughtPanel({ node, onClose, onSelectWorkspace }: ThoughtPanelProps) {
  const [selectedFileId, setSelectedFileId] = useState<"thesis" | "explorations" | "realization" | "previews">("previews");
  const [mobileActiveView, setMobileActiveView] = useState<"files" | "detail">("files");

  const files: FileItem[] = [
    { name: "preview_stack", type: "folder", icon: Icons.Folder, id: "previews" },
    { name: "thesis.rtf", type: "file", icon: Icons.FileText, id: "thesis" },
    { name: "explorations", type: "folder", icon: Icons.Folder, id: "explorations" },
    { name: "realization.log", type: "file", icon: Icons.Terminal, id: "realization" },
  ];

  const handleFileClick = (fileId: "thesis" | "explorations" | "realization" | "previews") => {
    setSelectedFileId(fileId);
    setMobileActiveView("detail");
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#141413]/94 border border-white/10 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl font-sans text-white">
      {/* 1. macOS Style Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1c1c1b] border-b border-white/5 select-none shrink-0">
        {/* Left Window Control Buttons */}
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/85 flex items-center justify-center group cursor-pointer transition-colors"
              title="Close window"
            >
              <Icons.X className="h-1.5 w-1.5 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
          {!onClose && <div className="w-3 h-3 rounded-full bg-[#444443]" />}
          <div className="w-3 h-3 rounded-full bg-[#feec6f]/30" />
          <div className="w-3 h-3 rounded-full bg-[#5bf58d]/30" />
        </div>
        
        {/* Window Title */}
        <div className="text-[10px] sm:text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
          <Icons.FolderClosed className="h-3.5 w-3.5 text-amber-500" />
          <span>{node.title}</span>
        </div>
        
        {/* Spacer */}
        <div className="w-12" />
      </div>

      {/* 2. Finder Body Container */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        
        {/* Column 1: Sidebar (Hidden on mobile/tablet) */}
        <div className="hidden md:flex w-44 bg-[#181817]/60 border-r border-white/5 p-2.5 flex-col gap-1 overflow-y-auto select-none shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 px-2 py-1.5">
            Favorites
          </span>
          <div className="space-y-0.5">
            {thoughtWorkspaces.map((w) => {
              const WIcon = getWorkspaceIcon(w.iconName);
              const isWActive = w.id === node.id;
              return (
                <button
                  key={w.id}
                  onClick={() => onSelectWorkspace && onSelectWorkspace(w.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-xs transition-all cursor-pointer ${
                    isWActive
                      ? "bg-amber-500/15 border border-amber-500/20 text-amber-300 font-semibold"
                      : "text-neutral-400 border border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <WIcon className={`h-3.5 w-3.5 ${isWActive ? "text-amber-400" : "text-neutral-500"}`} />
                  <span className="truncate">{w.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Files Grid / Explorer Area */}
        <div className={`flex-1 bg-[#10100f]/40 p-4 overflow-y-auto select-none ${
          mobileActiveView === "detail" ? "hidden sm:block" : "block"
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {files.map((file) => {
              const FileIcon = file.icon;
              const isSelected = selectedFileId === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => handleFileClick(file.id)}
                  className={`flex flex-col items-center p-3.5 rounded-xl border cursor-pointer transition-all duration-150 group ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                      : "bg-white/0 border-transparent text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                  }`}
                >
                  <FileIcon className={`h-11 w-11 mb-2 transition-transform group-hover:scale-105 ${
                    isSelected ? "text-amber-400" : "text-neutral-500 group-hover:text-neutral-400"
                  }`} />
                  <span className="text-[11px] text-center font-medium truncate max-w-full px-1">
                    {file.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Preview Pane (Responsive layout) */}
        <div className={`w-full sm:w-64 bg-[#141413]/60 border-t sm:border-t-0 sm:border-l border-white/5 p-4 flex flex-col overflow-y-auto shrink-0 ${
          mobileActiveView === "detail" ? "block" : "hidden lg:flex"
        }`}>
          {/* Back button for mobile view when detailing file */}
          <div className="flex sm:hidden items-center mb-3">
            <button
              onClick={() => setMobileActiveView("files")}
              className="flex items-center gap-1 text-xs text-amber-400 cursor-pointer font-bold uppercase tracking-wider"
            >
              <Icons.ChevronLeft className="h-4 w-4" />
              <span>Back to files</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {selectedFileId === "previews" && (
              <motion.div
                key="previews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center h-full justify-between"
              >
                <div className="flex flex-col items-center w-full">
                  {/* File Stack Preview */}
                  <div className="h-28 flex items-center justify-center mb-6 mt-2 relative z-10 w-full">
                    <ImagesBadge
                      text=""
                      images={node.images}
                      folderSize={{ width: 64, height: 48 }}
                      teaserImageSize={{ width: 44, height: 30 }}
                      hoverImageSize={{ width: 80, height: 56 }}
                      hoverTranslateY={-30}
                      hoverSpread={20}
                      hoverRotation={12}
                    />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                    {node.title}
                  </h4>
                  <p className="text-[9px] text-neutral-500 mt-1 uppercase tracking-widest">
                    Folder Preview Stack
                  </p>
                  
                  <div className="w-full border-t border-white/5 my-4" />
                  
                  <div className="text-left w-full space-y-3">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase text-neutral-500 tracking-wider block">Description</span>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">{node.description}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full text-left space-y-2.5 border-t border-white/5 pt-3 mt-4">
                  <span className="text-[8px] font-bold uppercase text-neutral-500 tracking-wider block">File Info</span>
                  <div className="grid grid-cols-2 gap-y-1 text-[9px] font-mono text-neutral-400">
                    <span>Kind:</span><span className="text-neutral-300">Image Stack</span>
                    <span>Count:</span><span className="text-neutral-300">3 previews</span>
                    <span>Tension:</span><span className="text-amber-400/90 font-semibold">{node.tension}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedFileId === "thesis" && (
              <motion.div
                key="thesis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col text-left h-full justify-between"
              >
                <div>
                  <div className="h-16 flex items-center justify-center mb-4 text-amber-500 bg-amber-500/5 rounded-xl border border-amber-500/10">
                    <Icons.FileText className="h-8 w-8" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 truncate">
                    thesis.rtf
                  </h4>
                  <p className="text-[9px] text-neutral-500 mt-1 uppercase tracking-widest">
                    Rich Text Document
                  </p>
                  
                  <div className="w-full border-t border-white/5 my-4" />
                  
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-neutral-500 tracking-wider block">Core Thesis Belief</span>
                    <blockquote className="text-[11px] text-amber-200/90 italic mt-2.5 border-l-2 border-amber-500/50 pl-2.5 leading-relaxed">
                      "{node.belief}"
                    </blockquote>
                  </div>
                </div>

                <div className="w-full text-left space-y-2 border-t border-white/5 pt-3 mt-4">
                  <span className="text-[8px] font-bold uppercase text-neutral-500 tracking-wider block">Document Info</span>
                  <div className="grid grid-cols-2 gap-y-1 text-[9px] font-mono text-neutral-400">
                    <span>Size:</span><span className="text-neutral-300">1.2 KB</span>
                    <span>Format:</span><span className="text-neutral-300">Rich Text</span>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedFileId === "explorations" && (
              <motion.div
                key="explorations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col text-left h-full justify-between"
              >
                <div>
                  <div className="h-16 flex items-center justify-center mb-4 text-amber-500 bg-amber-500/5 rounded-xl border border-amber-500/10">
                    <Icons.FolderGit className="h-8 w-8" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 truncate">
                    explorations
                  </h4>
                  <p className="text-[9px] text-neutral-500 mt-1 uppercase tracking-widest">
                    Exploration Directory
                  </p>
                  
                  <div className="w-full border-t border-white/5 my-4" />
                  
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-neutral-500 tracking-wider block mb-2">Vectors</span>
                    <ul className="space-y-2">
                      {node.exploring.map((item, i) => (
                        <li key={i} className="text-[11px] text-neutral-300 flex items-start gap-2 leading-relaxed">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="w-full text-left space-y-2 border-t border-white/5 pt-3 mt-4">
                  <span className="text-[8px] font-bold uppercase text-neutral-500 tracking-wider block">Directory Info</span>
                  <div className="grid grid-cols-2 gap-y-1 text-[9px] font-mono text-neutral-400">
                    <span>Items:</span><span className="text-neutral-300">{node.exploring.length} files</span>
                    <span>Path:</span><span className="text-neutral-300">/src/explorations</span>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedFileId === "realization" && (
              <motion.div
                key="realization"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col text-left h-full justify-between"
              >
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="h-16 flex items-center justify-center mb-4 text-emerald-400 bg-emerald-400/5 rounded-xl border border-emerald-400/10 shrink-0">
                    <Icons.Terminal className="h-8 w-8" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 truncate shrink-0">
                    realization.log
                  </h4>
                  <p className="text-[9px] text-neutral-500 mt-1 uppercase tracking-widest shrink-0">
                    Log Output
                  </p>
                  
                  <div className="w-full border-t border-white/5 my-4 shrink-0" />
                  
                  <div className="flex-1 flex flex-col min-h-0">
                    <span className="text-[9px] font-extrabold uppercase text-neutral-500 tracking-wider block mb-2 shrink-0">Output Stream</span>
                    <div className="flex-1 bg-black/40 border border-white/5 rounded-lg p-2.5 font-mono text-[10px] text-amber-200/90 italic leading-relaxed overflow-y-auto">
                      "{node.realization}"
                    </div>
                  </div>
                </div>

                <div className="w-full text-left space-y-2 border-t border-white/5 pt-3 mt-4 shrink-0">
                  <span className="text-[8px] font-bold uppercase text-neutral-500 tracking-wider block">Log Info</span>
                  <div className="grid grid-cols-2 gap-y-1 text-[9px] font-mono text-neutral-400">
                    <span>Status:</span><span className="text-emerald-400 font-semibold">SUCCESS</span>
                    <span>Updated:</span><span className="text-neutral-300">Just now</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
