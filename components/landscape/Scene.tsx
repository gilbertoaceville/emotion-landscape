'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Terrain } from './Terrain';
import { TextInput } from '@/components/input/TextInput';
import { analyzeEmotion } from '@/lib/ai/sentimentAnalysis';
import { mapEmotionToVisuals } from '@/lib/three/emotionMapper';
import { LandscapeParams } from '@/lib/types/emotion';

export function Scene() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [landscapeParams, setLandscapeParams] = useState<LandscapeParams>(
    mapEmotionToVisuals('calm', 0.5)
  );

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeEmotion(text);
      const params = mapEmotionToVisuals(analysis.dominant, analysis.intensity);
      setLandscapeParams(params);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
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
          
          <Terrain params={landscapeParams} />
        </Canvas>
      </div>
      
      <TextInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
    </div>
  );
}