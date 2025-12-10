export type EmotionType =
  | 'joy'
  | 'sadness'
  | 'anger'
  | 'fear'
  | 'surprise'
  | 'disgust'
  | 'love'
  | 'calm'
  | 'excitement'
  | 'nostalgia'
  | 'hope'
  | 'confusion';

export interface EmotionAnalysis {
  emotions: {
    [K in EmotionType]?: number;
  };
  dominant: EmotionType;
  intensity: number;
  text: string;
  timestamp: Date;
}

export interface LandscapeParams {
  emotion: EmotionType;
  intensity: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  terrain: {
    roughness: number;
    height: number;
    frequency: number;
  };
  weather: 'sunny' | 'rainy' | 'stormy' | 'foggy' | 'clear' | 'overcast' | 'sunset' | 'dawn';
  particles: {
    type: string;
    count: number;
    speed: number;
  };
}

export interface Landscape {
  id: string;
  title: string;
  text: string;
  analysis: EmotionAnalysis;
  params: LandscapeParams;
  created_at: string;
  userId?: string;
  isPublic: boolean;
  likes: number;
}