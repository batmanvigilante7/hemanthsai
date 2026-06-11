import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-black py-20 flex flex-col items-center justify-center">
      <MacbookScroll
        title={
          <span className="text-white text-3xl font-extrabold tracking-tight">
            Designed to build. Built to execute.
          </span>
        }
        badge={
          <div className="h-10 w-10 -rotate-12 transform bg-amber-500 rounded-xl flex items-center justify-center text-black font-black text-xs shadow-lg shadow-amber-500/20">
            PRO
          </div>
        }
        showGradient={false}
      >
        {/* Live React UI inside the Macbook Screen */}
        <div className="flex flex-col h-full w-full bg-[#09090b] text-neutral-200 font-mono text-[10px] p-3 select-none">
          {/* Mock Code Editor Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
              <span className="text-neutral-500 ml-2">thought-workspace.tsx</span>
            </div>
            <div className="text-neutral-600 text-[8px]">TypeScript React</div>
          </div>

          {/* Code Body */}
          <div className="flex-1 overflow-y-auto leading-relaxed text-left space-y-1">
            <p className="text-neutral-500">// Initialize Mental Desktop</p>
            <p>
              <span className="text-purple-400">const</span> <span className="text-blue-400">ThoughtOS</span> ={" "}
              <span className="text-yellow-400">new</span> <span className="text-green-400">MindWorkspace</span>
              <span className="text-white">({`{`}</span>
            </p>
            <p className="pl-4">
              <span className="text-neutral-400">core:</span> <span className="text-amber-300">"AI + Human Capacity"</span>,
            </p>
            <p className="pl-4">
              <span className="text-neutral-400">speed:</span> <span className="text-amber-300">"21-day sprints"</span>,
            </p>
            <p className="pl-4">
              <span className="text-neutral-400">status:</span> <span className="text-emerald-400">"Compounding"</span>
            </p>
            <p>
              <span className="text-white">{`})`}</span>;
            </p>
            <p className="text-neutral-500 mt-2">// Launching the execution engine...</p>
            <div className="mt-2 p-2 rounded bg-black/50 border border-neutral-800/60 text-emerald-400 font-mono text-[9px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-neutral-400 uppercase tracking-wider text-[8px] font-bold">Terminal Output</span>
              </div>
              <p className="text-neutral-300">$ npm run dev</p>
              <p className="text-neutral-500">› Ready in 234ms - port: 3000</p>
              <p className="text-neutral-500">› Compiling workspace modules...</p>
              <p className="text-emerald-400">✔ Successfully deployed to mental stack.</p>
            </div>
          </div>
        </div>
      </MacbookScroll>
    </div>
  );
}
