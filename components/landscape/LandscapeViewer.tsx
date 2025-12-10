"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Terrain } from "./Terrain";
import { Particles } from "./Particles";
import { Landscape } from "@/lib/types/emotion";

interface LandscapeViewerProps {
  landscape: Landscape;
}

export function LandscapeViewer({ landscape }: LandscapeViewerProps) {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 20, 30]} />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={100}
        />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 5]} intensity={1} />

        <Terrain params={landscape.params} />
        <Particles params={landscape.params} />
      </Canvas>
    </div>
  );
}
