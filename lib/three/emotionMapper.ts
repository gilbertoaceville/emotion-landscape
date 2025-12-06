import { EmotionType, LandscapeParams } from "@/lib/types/emotion";

export function mapEmotionToVisuals(
  emotion: EmotionType,
  intensity: number
): LandscapeParams {
  const baseParams = getBaseParamsForEmotion(emotion);

  return {
    emotion,
    intensity,
    colors: baseParams.colors,
    terrain: {
      roughness: baseParams.terrain.roughness * intensity,
      height: baseParams.terrain.height * intensity,
      frequency: baseParams.terrain.frequency,
    },
    weather: baseParams.weather,
    particles: {
      type: baseParams.particles.type,
      count: Math.floor(baseParams.particles.count * intensity),
      speed: baseParams.particles.speed * (0.5 + intensity * 0.5),
    },
  };
}

function getBaseParamsForEmotion(emotion: EmotionType): LandscapeParams {
  const emotionMap: Record<EmotionType, LandscapeParams> = {
    joy: {
      emotion: "joy",
      intensity: 1,
      colors: { primary: "#FFD700", secondary: "#FFA500", accent: "#FFFF00" },
      terrain: { roughness: 0.3, height: 0.8, frequency: 2 },
      weather: "sunny",
      particles: { type: "sparkles", count: 100, speed: 1 },
    },
    sadness: {
      emotion: "sadness",
      intensity: 1,
      colors: { primary: "#4169E1", secondary: "#708090", accent: "#B0C4DE" },
      terrain: { roughness: 0.2, height: 0.3, frequency: 1.5 },
      weather: "rainy",
      particles: { type: "droplets", count: 150, speed: 2 },
    },
    anger: {
      emotion: "anger",
      intensity: 1,
      colors: { primary: "#DC143C", secondary: "#8B0000", accent: "#FF4500" },
      terrain: { roughness: 0.9, height: 0.9, frequency: 3 },
      weather: "stormy",
      particles: { type: "lightning", count: 50, speed: 3 },
    },
    fear: {
      emotion: "fear",
      intensity: 1,
      colors: { primary: "#9370DB", secondary: "#483D8B", accent: "#2F4F4F" },
      terrain: { roughness: 0.7, height: 0.6, frequency: 2.5 },
      weather: "foggy",
      particles: { type: "shadows", count: 80, speed: 0.5 },
    },
    surprise: {
      emotion: "surprise",
      intensity: 1,
      colors: { primary: "#00FFFF", secondary: "#FFFFFF", accent: "#87CEEB" },
      terrain: { roughness: 0.8, height: 0.7, frequency: 4 },
      weather: "clear",
      particles: { type: "bursts", count: 120, speed: 2.5 },
    },
    disgust: {
      emotion: "disgust",
      intensity: 1,
      colors: { primary: "#9ACD32", secondary: "#8B4513", accent: "#556B2F" },
      terrain: { roughness: 0.6, height: 0.5, frequency: 2 },
      weather: "overcast",
      particles: { type: "dust", count: 90, speed: 1.5 },
    },
    love: {
      emotion: "love",
      intensity: 1,
      colors: { primary: "#FF69B4", secondary: "#FFB6C1", accent: "#FFC0CB" },
      terrain: { roughness: 0.2, height: 0.6, frequency: 1.8 },
      weather: "sunset",
      particles: { type: "hearts", count: 100, speed: 1 },
    },
    calm: {
      emotion: "calm",
      intensity: 1,
      colors: { primary: "#20B2AA", secondary: "#87CEEB", accent: "#B0E0E6" },
      terrain: { roughness: 0.1, height: 0.4, frequency: 1 },
      weather: "clear",
      particles: { type: "leaves", count: 60, speed: 0.8 },
    },
    excitement: {
      emotion: "excitement",
      intensity: 1,
      colors: { primary: "#FF00FF", secondary: "#FFD700", accent: "#FF1493" },
      terrain: { roughness: 0.6, height: 0.8, frequency: 3 },
      weather: "clear",
      particles: { type: "confetti", count: 200, speed: 2 },
    },
    nostalgia: {
      emotion: "nostalgia",
      intensity: 1,
      colors: { primary: "#DAA520", secondary: "#F4A460", accent: "#DEB887" },
      terrain: { roughness: 0.4, height: 0.5, frequency: 1.5 },
      weather: "sunset",
      particles: { type: "memories", count: 70, speed: 0.7 },
    },
    hope: {
      emotion: "hope",
      intensity: 1,
      colors: { primary: "#FFFACD", secondary: "#FFFFFF", accent: "#F0E68C" },
      terrain: { roughness: 0.3, height: 0.7, frequency: 2 },
      weather: "dawn",
      particles: { type: "stars", count: 80, speed: 1.2 },
    },
    confusion: {
      emotion: "confusion",
      intensity: 1,
      colors: { primary: "#BA55D3", secondary: "#9370DB", accent: "#8A2BE2" },
      terrain: { roughness: 0.8, height: 0.6, frequency: 3.5 },
      weather: "foggy",
      particles: { type: "swirls", count: 100, speed: 1.5 },
    },
  };

  return emotionMap[emotion];
}

export function blendEmotions(
  emotions: Array<{ emotion: EmotionType; weight: number }>
): LandscapeParams {
  const dominant = emotions[0];
  const baseParams = mapEmotionToVisuals(dominant.emotion, dominant.weight);

  return baseParams;
}
