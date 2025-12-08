"use client";

import { useRef, useMemo, useEffect } from "react";
import { Mesh } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createNoise2D } from "simplex-noise";
import { LandscapeParams } from "@/lib/types/emotion";

interface TerrainProps {
  params: LandscapeParams;
}

export function Terrain({ params }: TerrainProps) {
  const meshRef = useRef<Mesh>(null);
  const targetPositions = useRef<Float32Array | null>(null);
  const currentProgress = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 50, 100, 100);
    return geo;
  }, []);

  useEffect(() => {
    const noise2D = createNoise2D();
    const positions = geometry.attributes.position.array;
    const newPositions = new Float32Array(positions.length);

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      const noise = noise2D(
        x * params.terrain.frequency * 0.1,
        y * params.terrain.frequency * 0.1
      );

      newPositions[i] = x;
      newPositions[i + 1] = y;
      newPositions[i + 2] = noise * params.terrain.height * 10;
    }

    targetPositions.current = newPositions;
    currentProgress.current = 0;
  }, [params, geometry]);

  useFrame((state, delta) => {
    if (!targetPositions.current || !meshRef.current) return;

    if (currentProgress.current < 1) {
      currentProgress.current = Math.min(
        1,
        currentProgress.current + delta * 0.5
      );

      const positions = new Float32Array(geometry.attributes.position.array);
      const target = targetPositions.current;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = THREE.MathUtils.lerp(
          positions[i + 2],
          target[i + 2],
          currentProgress.current
        );
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={params.colors.primary}
        roughness={params.terrain.roughness}
      />
    </mesh>
  );
}
