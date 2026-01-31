'use client';

import { useRef, useState } from 'react';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

interface FloatingCubeProps {
  position?: [number, number, number];
  scale?: number;
}

/**
 * FloatingCube - A floating, rotating cube with GSAP animation
 * Changes rotation speed on hover
 */
export function FloatingCube({ position = [9, -4, 0], scale = 0.74 }: FloatingCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (!cubeRef.current) return;

    gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    }).to(cubeRef.current.rotation, {
      y: hovered ? '+=2' : `+=${Math.PI * 2}`,
      x: hovered ? '+=2' : `-=${Math.PI * 2}`,
      duration: 2.5,
      stagger: {
        each: 0.15,
      },
    });
  }, { dependencies: [hovered] });

  return (
    <Float floatIntensity={2} speed={2}>
      <group position={position} rotation={[2.6, 0.8, -1.8]} scale={scale}>
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#00d4ff"
            metalness={0.9}
            roughness={0.1}
            emissive="#0077b6"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}
