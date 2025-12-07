"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Terrain } from "./Terrain";

export function Scene() {
  return (
    <div className="w-full h-screen bg-black">
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

        <Terrain
          width={50}
          depth={50}
          segments={100}
          heightScale={5}
          color="#4a9eff"
        />
      </Canvas>
    </div>
  );
}
