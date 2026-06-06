"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
} from "react";

const MouseEnterContext = createContext<
  [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    { rotateX: number; rotateY: number }
  ] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  divisor = 22,
  disableOnMobile = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  divisor?: number;
  disableOnMobile?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (disableOnMobile && typeof window !== "undefined" && window.innerWidth < 768) {
      setRotation({ rotateX: 0, rotateY: 0 });
      return;
    }
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / divisor;
    const y = (e.clientY - top - height / 2) / divisor;
    setRotation({ rotateX: -y, rotateY: x });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableOnMobile && typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }
    setIsMouseEntered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(false);
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered, rotation]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center overflow-visible",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative overflow-visible",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
  style,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) => {
  const context = useContext(MouseEnterContext);
  const rotation = context ? context[2] : { rotateX: 0, rotateY: 0 };
  const [isMouseEntered] = useMouseEnter();

  const transform = `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`;

  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        transform,
        transition: isMouseEntered ? "none" : "transform 0.5s ease",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale = 1,
  style,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  scale?: number | string;
  style?: React.CSSProperties;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      style={{ ...style, transform }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
