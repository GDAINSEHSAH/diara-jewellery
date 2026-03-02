"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageZoomProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export default function ImageZoom({ src, alt, onClick }: ImageZoomProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const LENS_SIZE = 150;
  const ZOOM = 2.5;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Clamp lens position
      const lx = Math.max(LENS_SIZE / 2, Math.min(x, rect.width - LENS_SIZE / 2));
      const ly = Math.max(LENS_SIZE / 2, Math.min(y, rect.height - LENS_SIZE / 2));

      setLensPos({ x: lx, y: ly });

      // Background position for zoomed view
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      setBgPos({ x: bgX, y: bgY });
    },
    [isMobile]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-zoom-in"
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* Lens overlay on hover (desktop only) */}
      {isHovering && !isMobile && (
        <div
          className="absolute rounded-full border-2 border-white/70 shadow-lg pointer-events-none overflow-hidden z-10"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: lensPos.x - LENS_SIZE / 2,
            top: lensPos.y - LENS_SIZE / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${ZOOM * 100}%`,
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}
