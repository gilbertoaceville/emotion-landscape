import { getLandscapeById } from "@/lib/data/landscapes";
import { notFound } from "next/navigation";
import { LandscapeViewer } from "@/components/landscape/LandscapeViewer";
import { Heart, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function LandscapePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const landscape = await getLandscapeById(id);

  if (!landscape) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 to-black">
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/gallery"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Gallery
        </Link>
      </div>

      <div className="absolute top-8 right-8 z-10 bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">
          {landscape.title}
        </h1>
        <p className="text-gray-400 mb-4">{landscape.text}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(landscape.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} />
            {landscape.likes} likes
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="text-white font-semibold mb-2">Dominant Emotion</div>
          <div className="text-2xl capitalize">
            {landscape.analysis.dominant}
          </div>
          <div className="text-gray-400 text-sm">
            {Math.round(landscape.analysis.intensity * 100)}% intensity
          </div>
        </div>
      </div>

      <LandscapeViewer landscape={landscape} />
    </main>
  );
}
