'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated gradient sphere with distortion
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[2, 0, -2]}>
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Animated torus knot
function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[-2.5, -0.5, -1]}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <meshStandardMaterial
          color="#0096c7"
          roughness={0.3}
          metalness={0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Floating icosahedron
function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 1.5, -3]}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color="#48cae4"
        roughness={0.1}
        metalness={0.9}
        flatShading
      />
    </mesh>
  );
}

// Particle ring
function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + (i * 0.618033988749 % 1) * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (i * 0.618033988749 % 1 - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return positions;
  }, []);

  // Create geometry with positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Background gradient plane
function BackgroundPlane() {
  return (
    <mesh position={[0, 0, -8]} rotation={[0, 0, 0]}>
      <planeGeometry args={[30, 20]} />
      <meshBasicMaterial color="#0a0a12" />
    </mesh>
  );
}

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className = '' }: HeroCanvasProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#0096c7" />
        
        {/* Background */}
        <BackgroundPlane />
        
        {/* 3D Elements */}
        <AnimatedSphere />
        <AnimatedTorus />
        <FloatingIcosahedron />
        <ParticleRing />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a12', 5, 15]} />
      </Canvas>
    </div>
  );
}

// Lightweight version for mobile
export function HeroCanvasLite({ className = '' }: HeroCanvasProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        dpr={1}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        <Float speed={1} rotationIntensity={0.3}>
          <mesh position={[0, 0, -2]}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial
              color="#00d4ff"
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
        
        <fog attach="fog" args={['#0a0a12', 3, 10]} />
      </Canvas>
    </div>
  );
}
