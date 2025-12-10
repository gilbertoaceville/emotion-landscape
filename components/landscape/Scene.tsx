"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Terrain } from "./Terrain";
import { Particles } from "./Particles";
import { TextInput } from "@/components/input/TextInput";
import { EmotionDisplay } from "@/components/input/EmotionDisplay";
import { SaveModal } from "@/components/input/SaveModal";
import { analyzeEmotion } from "@/lib/ai/sentimentAnalysis";
import { mapEmotionToVisuals } from "@/lib/three/emotionMapper";
import { saveLandscape } from "@/lib/data/landscapes-client";
import { LandscapeParams, EmotionAnalysis } from "@/lib/types/emotion";

export function Scene() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null);
  const [landscapeParams, setLandscapeParams] = useState<LandscapeParams>(
    mapEmotionToVisuals("calm", 0.5)
  );
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    setCurrentText(text);

    try {
      const newAnalysis = await analyzeEmotion(text);
      const params = mapEmotionToVisuals(
        newAnalysis.dominant,
        newAnalysis.intensity
      );

      setAnalysis(newAnalysis);
      setLandscapeParams(params);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async (title: string) => {
    if (!analysis) return;

    const result = await saveLandscape(
      title,
      currentText,
      analysis,
      landscapeParams
    );

    if (result) {
      setShowSaveModal(false);
      alert("Landscape saved! 🎉");
    } else {
      alert("Failed to save landscape");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-linear-to-b from-gray-900 to-black">
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
          <Particles params={landscapeParams} />
        </Canvas>
      </div>

      <EmotionDisplay
        analysis={analysis}
        onSave={() => setShowSaveModal(true)}
      />
      <TextInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {showSaveModal && (
        <SaveModal
          onSave={handleSave}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}
