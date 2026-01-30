/**
 * Design Tokens
 * Centralized design constants for the Personal Blog Platform
 */

export const colors = {
  primary: {
    DEFAULT: "oklch(0.7 0.22 270)",
    light: "oklch(0.8 0.18 270)",
    dark: "oklch(0.55 0.25 270)",
  },
  accent: {
    DEFAULT: "oklch(0.75 0.12 180)",
    light: "oklch(0.85 0.1 180)",
    dark: "oklch(0.65 0.15 180)",
  },
  coral: {
    DEFAULT: "oklch(0.7 0.2 340)",
    light: "oklch(0.8 0.16 340)",
    dark: "oklch(0.6 0.22 340)",
  },
} as const;

export const spacing = {
  section: {
    sm: "4rem",
    md: "6rem",
    lg: "8rem",
  },
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    prose: "720px",
  },
} as const;

export const typography = {
  fonts: {
    heading: "'Outfit', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  sizes: {
    hero: "clamp(2.5rem, 8vw, 5rem)",
    title: "clamp(2rem, 5vw, 3.5rem)",
    subtitle: "clamp(1.5rem, 3vw, 2rem)",
    body: "1.125rem",
    small: "0.875rem",
  },
  lineHeights: {
    tight: "1.1",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

export const animation = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "700ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
} as const;

export const shadows = {
  sm: "0 1px 2px oklch(0 0 0 / 0.05)",
  md: "0 4px 6px -1px oklch(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px oklch(0 0 0 / 0.1)",
  glow: {
    primary: "0 0 40px oklch(0.7 0.22 270 / 0.3)",
    accent: "0 0 40px oklch(0.75 0.12 180 / 0.3)",
  },
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const zIndex = {
  dropdown: 50,
  sticky: 100,
  fixed: 150,
  modal: 200,
  popover: 250,
  tooltip: 300,
} as const;

// Reading time estimation
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Format reading time
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "Less than 1 min read";
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}
