'use client';

import { ReactNode } from 'react';

interface GradientBlobProps {
  className?: string;
}

export function GradientBlob({ className = '' }: GradientBlobProps) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {/* Primary violet blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, oklch(0.7 0.22 270 / 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          left: '-200px',
          top: '-200px',
        }}
      />
      {/* Teal accent blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, oklch(0.75 0.12 180 / 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          right: '-150px',
          top: '100px',
          animationDelay: '2s',
        }}
      />
      {/* Coral blob */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, oklch(0.7 0.2 340 / 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          left: '30%',
          bottom: '-100px',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}

interface GridPatternProps {
  className?: string;
}

export function GridPattern({ className = '' }: GridPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-[0.02] ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(var(--foreground) 1px, transparent 1px),
          linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

interface NoiseOverlayProps {
  opacity?: number;
}

export function NoiseOverlay({ opacity = 0.03 }: NoiseOverlayProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'accent' | 'coral';
}

export function GlowCard({ 
  children, 
  className = '',
  glowColor = 'primary' 
}: GlowCardProps) {
  const glowColors = {
    primary: 'oklch(0.7 0.22 270 / 0.2)',
    accent: 'oklch(0.75 0.12 180 / 0.2)',
    coral: 'oklch(0.7 0.2 340 / 0.2)',
  };

  return (
    <div
      className={`relative group ${className}`}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: glowColors[glowColor] }}
      />
      {/* Card content */}
      <div className="relative glass rounded-xl">
        {children}
      </div>
    </div>
  );
}
