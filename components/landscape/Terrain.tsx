"use client";

import { useRef, useMemo } from "react";
import { Mesh } from "three";
import { createNoise2D } from "simplex-noise";
import * as THREE from "three";

interface TerrainProps {
  width?: number;
  depth?: number;
  segments?: number;
  heightScale?: number;
  color?: string;
}

export function Terrain({
  width = 50,
  depth = 50,
  segments = 100,
  heightScale = 5,
  color = "#4a9eff",
}: TerrainProps) {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    const noise2D = createNoise2D();

    const geo = new THREE.PlaneGeometry(width, depth, segments, segments);

    const positions = geo.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      const noise = noise2D(x * 0.1, y * 0.1);

      positions[i + 2] = noise * heightScale;
    }

    geo.computeVertexNormals();

    return geo;
  }, [width, depth, segments, heightScale]);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={color}
        wireframe={false}
        flatShading={false}
      />
    </mesh>
  );
}
