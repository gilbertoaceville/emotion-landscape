import {
  Landscape,
  EmotionAnalysis,
  LandscapeParams,
} from "@/lib/types/emotion";
import { supabase } from "@/lib/supabase/client";

export async function saveLandscape(
  title: string,
  text: string,
  analysis: EmotionAnalysis,
  params: LandscapeParams
): Promise<Landscape | null> {
  try {
    const { data, error } = await supabase
      .from("landscapes")
      .insert({
        title,
        text,
        analysis,
        params,
        is_public: true,
      })
      .select()
      .single();

    if (error) throw error;

    // Increment global emotion count
    await supabase.rpc("increment_emotion_count", {
      emotion_name: analysis.dominant,
    });

    return data;
  } catch (error) {
    console.error("Error saving landscape:", error);
    return null;
  }
}

export async function incrementLikes(landscapeId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc("increment_likes", {
      landscape_id: landscapeId,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error incrementing likes:", error);
  }
}

export async function getGlobalMood(): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .from("global_moods")
      .select("emotion, count");

    if (error) throw error;

    const moodMap: Record<string, number> = {};
    data?.forEach((item: { emotion: string; count: number }) => {
      moodMap[item.emotion] = item.count;
    });

    return moodMap;
  } catch (error) {
    console.error("Error fetching global mood:", error);
    return {};
  }
}
