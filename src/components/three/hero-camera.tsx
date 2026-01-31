'use client';

import { useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

interface HeroCameraProps {
  children: ReactNode;
  isMobile?: boolean;
}

/**
 * HeroCamera - A mouse-following camera group
 * Smoothly rotates children based on mouse position using maath easing
 */
export function HeroCamera({ children, isMobile = false }: HeroCameraProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Smoothly move camera to target position
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);

    // Rotate group based on mouse position (desktop only)
    if (!isMobile && groupRef.current) {
      easing.dampE(
        groupRef.current.rotation,
        [-state.pointer.y / 3, state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
