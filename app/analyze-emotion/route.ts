import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { EmotionAnalysis, EmotionType } from "@/lib/types/emotion";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const labelToEmotion: Record<string, EmotionType> = {
  joy: "joy",
  sadness: "sadness",
  anger: "anger",
  fear: "fear",
  surprise: "surprise",
  disgust: "disgust",
  love: "love",
  neutral: "calm",
  admiration: "love",
  excitement: "excitement",
  confusion: "confusion",
  nervousness: "fear",
  disappointment: "sadness",
};

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const result = await hf.textClassification({
      model: "j-hartmann/emotion-english-distilroberta-base",
      inputs: text,
    });

    const emotions: Record<string, number> = {};
    let maxScore = 0;
    let dominant: EmotionType = "calm";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result.forEach((item: any) => {
      const emotion = labelToEmotion[item.label.toLowerCase()];
      if (emotion) {
        emotions[emotion] = item.score;
        if (item.score > maxScore) {
          maxScore = item.score;
          dominant = emotion;
        }
      }
    });

    const analysis: EmotionAnalysis = {
      emotions,
      dominant,
      intensity: maxScore,
      text,
      timestamp: new Date(),
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("HuggingFace API error:", error);

    return NextResponse.json({
      emotions: { calm: 0.7 },
      dominant: "calm",
      intensity: 0.5,
      text: "Error occurred",
      timestamp: new Date(),
    });
  }
}
