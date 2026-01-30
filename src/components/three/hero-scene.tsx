'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ 
  position, 
  color, 
  speed = 1,
  distort = 0.3 
}: { 
  position: [number, number, number]; 
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 100 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#14b8a6" />
      
      {/* Main floating shapes */}
      <FloatingShape 
        position={[-3, 0.5, -2]} 
        color="#7c3aed" 
        speed={1.2}
        distort={0.4}
      />
      <FloatingShape 
        position={[3, -0.5, -1]} 
        color="#14b8a6" 
        speed={0.8}
        distort={0.3}
      />
      <FloatingShape 
        position={[0, 2, -3]} 
        color="#ec4899" 
        speed={1}
        distort={0.35}
      />
      
      {/* Particles */}
      <Particles count={80} />
      
      <Environment preset="night" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      
      {/* Gradient overlay for text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.12 0.02 260 / 0.8) 70%)',
        }}
      />
    </div>
  );
}

// Lightweight version for mobile
export function HeroSceneMobile() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Static gradient blobs instead of 3D */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, oklch(0.7 0.22 270 / 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          left: '-100px',
          top: '-100px',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, oklch(0.75 0.12 180 / 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          right: '-80px',
          top: '20%',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, oklch(0.7 0.2 340 / 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          left: '20%',
          bottom: '-50px',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}
