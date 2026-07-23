"use client";

// Ported to TypeScript from React Bits (TextPressure), original effect by
// Juan Fuentes — https://codepen.io/JuanFuentes/full/rgXKGQ
// Changes for this project: self-hosted Roboto Flex via next/font (no
// external @import), the interaction is gated to fine-pointer + no-reduced-
// motion devices (mobile/reduced-motion get a clean static headline), the
// 'flex' layout is applied inline to avoid colliding with Tailwind's `flex`
// utility, and it is left-alignable.

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";

type Point = { x: number; y: number };

const dist = (a: Point, b: Point) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (
  distance: number,
  maxDist: number,
  minVal: number,
  maxVal: number,
) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

/** Interactive only where it makes sense: a real pointer + motion allowed. */
const canInteract = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

export function TextPressure({
  text = "Compressa",
  fontFamily = "var(--font-roboto-flex)",
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  scale = false,
  align = "center",
  textColor = "#E8E6E0",
  className = "",
  minFontSize = 24,
}: {
  text?: string;
  fontFamily?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  scale?: boolean;
  align?: "left" | "center" | "right";
  textColor?: string;
  className?: string;
  minFontSize?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  // Pointer tracking — only wired up on interactive devices.
  useEffect(() => {
    if (!canInteract()) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    const newFontSize = Math.max(containerW / (chars.length / 2), minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const debounced = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(setSize, 100);
    };
    setSize();
    window.addEventListener("resize", debounced);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debounced);
    };
  }, [setSize]);

  useEffect(() => {
    if (!canInteract()) return;

    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : "1";

          const settings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (span.style.fontVariationSettings !== settings) {
            span.style.fontVariationSettings = settings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const titleStyle: CSSProperties = {
    fontFamily,
    textTransform: "uppercase",
    fontSize,
    lineHeight,
    transform: `scale(1, ${scaleY})`,
    transformOrigin: "center top",
    margin: 0,
    textAlign: align,
    userSelect: "none",
    whiteSpace: "nowrap",
    // Readable base weight for static (mobile / reduced-motion) devices;
    // on interactive devices font-variation-settings overrides this.
    fontWeight: 600,
    width: "100%",
    color: textColor,
    display: flex ? "flex" : "block",
    justifyContent: flex ? "space-between" : undefined,
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <h1 ref={titleRef} className={className} style={titleStyle}>
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{ display: "inline-block" }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
