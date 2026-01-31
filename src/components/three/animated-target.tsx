'use client';

import { useRef } from 'react';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

interface AnimatedTargetProps {
  position?: [number, number, number];
  scale?: number;
}

/**
 * AnimatedTarget - A bouncing target/bullseye with GSAP animation
 */
export function AnimatedTarget({ position = [-8, 2, 0], scale = 1.5 }: AnimatedTargetProps) {
  const targetRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!targetRef.current) return;

    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  });

  return (
    <Float floatIntensity={0.5} speed={1.5}>
      <group ref={targetRef} position={position} scale={scale} rotation={[0, Math.PI / 5, 0]}>
        {/* Outer ring */}
        <mesh>
          <torusGeometry args={[0.8, 0.1, 16, 32]} />
          <meshStandardMaterial color="#ff4444" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Middle ring */}
        <mesh>
          <torusGeometry args={[0.5, 0.08, 16, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Inner ring */}
        <mesh>
          <torusGeometry args={[0.25, 0.06, 16, 32]} />
          <meshStandardMaterial color="#ff4444" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Center */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ff4444" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}
