"use client";

import { useRef, useMemo } from "react";
import { Mesh } from "three";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { LandscapeParams } from "@/lib/types/emotion";

interface TerrainProps {
  params: LandscapeParams;
}

export function Terrain({ params }: TerrainProps) {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    const noise2D = createNoise2D();

    const geo = new THREE.PlaneGeometry(50, 50, 100, 100);
    const positions = geo.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      const noise = noise2D(
        x * params.terrain.frequency * 0.1,
        y * params.terrain.frequency * 0.1
      );

      positions[i + 2] = noise * params.terrain.height * 10;
    }

    geo.computeVertexNormals();
    return geo;
  }, [params.terrain.frequency, params.terrain.height]);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={params.colors.primary}
        roughness={params.terrain.roughness}
      />
    </mesh>
  );
}
