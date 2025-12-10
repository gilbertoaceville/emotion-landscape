"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LandscapeParams } from "@/lib/types/emotion";

interface ParticlesProps {
  params: LandscapeParams;
}

function generateRandomPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = Math.random() * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  return positions;
}

export function Particles({ params }: ParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, geometry } = useMemo(() => {
    const count = params.particles.count;
    const positions = generateRandomPositions(count);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { positions, geometry: geo };
  }, [params.particles.count]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const direction = params.particles.type === "stars" ? 1 : -1;
      positions[i + 1] += direction * params.particles.speed * delta * 2;

      if (direction === -1 && positions[i + 1] < 0) {
        positions[i + 1] = 30;
      } else if (direction === 1 && positions[i + 1] > 30) {
        positions[i + 1] = 0;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.3}
        color={params.colors.accent}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
