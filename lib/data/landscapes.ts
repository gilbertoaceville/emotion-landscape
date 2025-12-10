import { Landscape } from "@/lib/types/emotion";
import { createClient } from "@/lib/supabase/server";

export async function getAllLandscapes(): Promise<Landscape[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("landscapes")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching landscapes:", error);
    return [];
  }

  return data || [];
}

export async function getLandscapeById(id: string): Promise<Landscape | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("landscapes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching landscape:", error);
    return null;
  }

  return data;
}

export async function getFeaturedLandscapes(
  limit: number = 6
): Promise<Landscape[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("landscapes")
    .select("*")
    .eq("is_public", true)
    .order("likes", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured landscapes:", error);
    return [];
  }

  return data || [];
}
