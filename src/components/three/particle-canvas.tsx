'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;
  
  // Use deterministic positions to avoid impure function warning
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    // Simple deterministic pseudo-random using golden ratio
    const phi = 1.618033988749;
    for (let i = 0; i < count; i++) {
      const t = i * phi;
      positions[i * 3] = ((t * 12.9898) % 1 - 0.5) * 15;
      positions[i * 3 + 1] = ((t * 78.233) % 1 - 0.5) * 15;
      positions[i * 3 + 2] = ((t * 43.758) % 1 - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (mesh1.current) {
      mesh1.current.position.x = Math.sin(t * 0.3) * 2;
      mesh1.current.position.y = Math.cos(t * 0.2) * 1.5;
      mesh1.current.rotation.x = t * 0.1;
    }
    
    if (mesh2.current) {
      mesh2.current.position.x = Math.cos(t * 0.4) * 2.5;
      mesh2.current.position.y = Math.sin(t * 0.3) * 2;
      mesh2.current.rotation.y = t * 0.15;
    }
    
    if (mesh3.current) {
      mesh3.current.position.x = Math.sin(t * 0.2) * 1.8;
      mesh3.current.position.z = Math.cos(t * 0.25) * 2;
      mesh3.current.rotation.z = t * 0.12;
    }
  });

  return (
    <>
      <mesh ref={mesh1} position={[-3, 0, -2]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={mesh2} position={[3, 1, -3]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#00b4d8" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh ref={mesh3} position={[0, -2, -2]}>
        <tetrahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#0096c7" wireframe transparent opacity={0.2} />
      </mesh>
    </>
  );
}

interface ParticleCanvasProps {
  className?: string;
}

export function ParticleCanvas({ className = '' }: ParticleCanvasProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}

// Lightweight alternative for mobile
export function ParticleCanvasLite({ className = '' }: ParticleCanvasProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
        dpr={1}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
