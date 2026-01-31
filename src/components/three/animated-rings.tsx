'use client';

import { useRef, useCallback } from 'react';
import { Center } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

interface AnimatedRingsProps {
  position?: [number, number, number];
  scale?: number;
}

/**
 * AnimatedRings - Concentric torus rings with GSAP rotation animation
 * Creates a mesmerizing spinning ring effect
 */
export function AnimatedRings({ position = [0, 0, 0], scale = 0.5 }: AnimatedRingsProps) {
  const refList = useRef<THREE.Mesh[]>([]);
  
  const getRef = useCallback((mesh: THREE.Mesh | null) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  useGSAP(() => {
    if (refList.current.length === 0) return;

    // Position all rings
    refList.current.forEach((ring) => {
      ring.position.set(position[0], position[1], position[2]);
    });

    // Create infinite rotation animation
    gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    }).to(
      refList.current.map((r) => r.rotation),
      {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: {
          each: 0.15,
        },
      }
    );
  }, { dependencies: [position] });

  return (
    <Center>
      <group scale={scale}>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh key={index} ref={getRef}>
            <torusGeometry args={[(index + 1) * 0.5, 0.1, 16, 32]} />
            <meshStandardMaterial
              color="#00d4ff"
              metalness={0.8}
              roughness={0.2}
              emissive="#00d4ff"
              emissiveIntensity={0.1}
            />
          </mesh>
        ))}
      </group>
    </Center>
  );
}
