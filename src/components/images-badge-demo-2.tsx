"use client";
import { ImagesBadge } from "@/components/ui/images-badge";

type ImagesBadgeDemoTwoProps = {
  text?: string;
  images?: string[];
  className?: string;
  containerClassName?: string;
  folderSize?: { width: number; height: number };
  teaserImageSize?: { width: number; height: number };
  hoverImageSize?: { width: number; height: number };
  hoverTranslateY?: number;
  hoverSpread?: number;
  hoverRotation?: number;
  folderColorClass?: string;
};

export default function ImagesBadgeDemoTwo({
  text = "Introducing Aceternity UI Pro",
  images = [
    "https://assets.aceternity.com/pro/agenforce-2.webp",
    "https://assets.aceternity.com/pro/minimal-3-min.webp",
    "https://assets.aceternity.com/pro/bento-4.png",
  ],
  className,
  containerClassName = "w-full",
  folderSize = { width: 48, height: 36 },
  teaserImageSize = { width: 40, height: 28 },
  hoverImageSize = { width: 140, height: 108 },
  hoverTranslateY = -110,
  hoverSpread = 50,
  hoverRotation,
  folderColorClass,
}: ImagesBadgeDemoTwoProps) {
  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <ImagesBadge
        text={text}
        images={images}
        folderSize={folderSize}
        teaserImageSize={teaserImageSize}
        hoverImageSize={hoverImageSize}
        hoverTranslateY={hoverTranslateY}
        hoverSpread={hoverSpread}
        hoverRotation={hoverRotation}
        folderColorClass={folderColorClass}
        className={className}
      />
    </div>
  );
}
