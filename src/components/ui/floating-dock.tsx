"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { 
    title: string; 
    icon: React.ReactNode; 
    href: string; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    isActive?: boolean;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { 
    title: string; 
    icon: React.ReactNode; 
    href: string; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    isActive?: boolean;
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick(e);
                    }
                  }}
                  key={item.title}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1b1f]/90 border border-white/10 shadow-lg relative",
                    item.isActive && "border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                  )}
                >
                  <div className="h-6 w-6 flex items-center justify-center">{item.icon}</div>
                  {item.isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                  )}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1b1f]/90 border border-white/10 shadow-lg"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { 
    title: string; 
    icon: React.ReactNode; 
    href: string; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    isActive?: boolean;
  }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-3 rounded-2xl bg-neutral-900/40 backdrop-blur-2xl border border-white/15 px-4 pb-2.5 md:flex shadow-xl",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  isActive,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  // Make the desktop icons scale from 42px up to 76px on hover for a beautiful premium magnetic scale
  let sizeTransform = useTransform(distance, [-140, 0, 140], [42, 72, 42]);

  let sizeSpring = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className="relative block"
    >
      <motion.div
        ref={ref}
        style={{ width: sizeSpring, height: sizeSpring }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center rounded-xl bg-transparent transition-all duration-200"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              transition={{ duration: 0.1 }}
              className="absolute -top-9 left-1/2 w-fit rounded-md border border-white/10 bg-black/85 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold whitespace-pre text-white shadow-lg pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Render the icon component directly to fill the container size and handle reflections/gloss */}
        <div className="w-full h-full flex items-center justify-center relative">
          {icon}
        </div>

        {/* Active Indicator Dot under the icon */}
        {isActive && (
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        )}
      </motion.div>
    </a>
  );
}
