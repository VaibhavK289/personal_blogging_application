'use client';

import { motion, HTMLMotionProps, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

// ===========================
// FADE ANIMATIONS
// ===========================

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration, 
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth feel
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// STAGGER ANIMATIONS
// ===========================

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// TEXT REVEAL ANIMATIONS
// ===========================

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const words = children.split(' ');
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: delay + i * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface CharacterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function CharacterReveal({ 
  children, 
  className = '', 
  delay = 0,
  stagger = 0.02 
}: CharacterRevealProps) {
  const characters = children.split('');
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.4,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ===========================
// PARALLAX EFFECTS
// ===========================

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export function Parallax({ 
  children, 
  className = '',
  speed = 0.5,
  offset = 0
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// SCALE ON SCROLL
// ===========================

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function ScaleOnScroll({ children, className = '' }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// MAGNETIC EFFECT
// ===========================

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// SCALE ON HOVER
// ===========================

interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function ScaleOnHover({ 
  children, 
  className = '',
  scale = 1.02 
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// ROTATE ON SCROLL
// ===========================

interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
}

export function RotateOnScroll({ 
  children, 
  className = '',
  rotation = 15
}: RotateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [-rotation, rotation]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{ rotate: smoothRotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// BLUR ON SCROLL
// ===========================

interface BlurOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function BlurOnScroll({ children, className = '' }: BlurOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        opacity 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// COUNT UP ANIMATION
// ===========================

interface CountUpProps {
  target: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ 
  target, 
  className = '', 
  duration = 2,
  prefix = '',
  suffix = ''
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);
  
  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ===========================
// PAGE TRANSITION
// ===========================

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// FLOATING ANIMATION
// ===========================

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function Floating({ 
  children, 
  className = '', 
  duration = 3,
  distance = 15 
}: FloatingProps) {
  return (
    <motion.div
      animate={{ y: [-distance, distance, -distance] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================
// REVEAL ON SCROLL
// ===========================

interface RevealProps {
  children: ReactNode;
  className?: string;
  width?: 'fit' | 'full';
}

export function Reveal({ children, className = '', width = 'fit' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${width === 'full' ? 'w-full' : 'w-fit'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 z-20 bg-gradient-primary"
        initial={{ left: 0 }}
        animate={isInView ? { left: '100%' } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
