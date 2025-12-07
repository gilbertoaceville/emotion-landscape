import { EmotionAnalysis } from "@/lib/types/emotion";

export async function analyzeEmotion(text: string): Promise<EmotionAnalysis> {
  try {
    const response = await fetch("/api/analyze-emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error || "Analysis failed");
    }

    return data;
  } catch (error) {
    console.error("Error analyzing emotion:", error);

    return {
      emotions: { calm: 0.7 },
      dominant: "calm",
      intensity: 0.5,
      text,
      timestamp: new Date(),
    };
  }
}
