"use client";

import { EmotionAnalysis } from "@/lib/types/emotion";
import { Save } from "lucide-react";

interface EmotionDisplayProps {
  analysis: EmotionAnalysis | null;
  onSave?: () => void;
}

const emotionEmojis: Record<string, string> = {
  joy: "😊",
  sadness: "😢",
  anger: "😠",
  fear: "😨",
  surprise: "😲",
  disgust: "🤢",
  love: "💕",
  calm: "😌",
  excitement: "🎉",
  nostalgia: "🌅",
  hope: "🌟",
  confusion: "🤔",
};

export function EmotionDisplay({ analysis, onSave }: EmotionDisplayProps) {
  if (!analysis) return null;

  const topEmotions = Object.entries(analysis.emotions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">Detected Emotions</h3>
        {onSave && (
          <button
            onClick={onSave}
            className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold flex items-center gap-2 text-sm"
          >
            <Save size={16} />
            Save
          </button>
        )}
      </div>

      <div className="space-y-3">
        {topEmotions.map(([emotion, score]) => (
          <div key={emotion} className="flex items-center gap-3">
            <span className="text-2xl">{emotionEmojis[emotion]}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-white capitalize">{emotion}</span>
                <span className="text-gray-400">
                  {Math.round(score * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${score * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
