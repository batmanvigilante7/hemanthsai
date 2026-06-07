"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export interface DockProps {
  className?: string;
  children: React.ReactNode;
}

export function Dock({ className, children }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl border border-white/10 bg-black/34 px-4 pb-3 backdrop-blur-md shadow-2xl relative z-40",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { mouseX });
        }
        return child;
      })}
    </motion.div>
  );
}

export interface DockIconProps {
  mouseX?: any;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function DockIcon({
  mouseX,
  className,
  active,
  onClick,
  children,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distanceLimit = 150;
  const sizeRange = [40, 68];

  const distance = useTransform(mouseX ?? useMotionValue(Infinity), (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(
    distance,
    [-distanceLimit, 0, distanceLimit],
    [sizeRange[0], sizeRange[1], sizeRange[0]]
  );

  const heightTransform = useTransform(
    distance,
    [-distanceLimit, 0, distanceLimit],
    [sizeRange[0], sizeRange[1], sizeRange[0]]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-colors duration-250 cursor-pointer border",
        active
          ? "bg-amber-400/20 border-amber-300 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
