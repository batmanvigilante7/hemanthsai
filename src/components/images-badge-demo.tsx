import React from "react";
import { ImagesBadge } from "./ui/images-badge";

export default function ImagesBadgeDemo() {
  const sampleImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=120&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=120&auto=format&fit=crop",
  ];

  return (
    <div className="flex flex-col gap-6 p-8 items-start bg-neutral-900 rounded-2xl border border-white/10">
      <h4 className="text-white font-bold text-lg">ImagesBadge Demo</h4>
      
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-neutral-400 mb-2">Default Folder Badge:</p>
          <ImagesBadge 
            text="Summer Collection" 
            images={sampleImages} 
            className="text-white"
          />
        </div>

        <div>
          <p className="text-xs text-neutral-400 mb-2">As Clickable Link (target=_blank):</p>
          <ImagesBadge 
            text="View Portfolio" 
            images={sampleImages} 
            href="https://github.com"
            target="_blank"
            className="text-amber-400 hover:text-amber-300"
          />
        </div>
      </div>
    </div>
  );
}
