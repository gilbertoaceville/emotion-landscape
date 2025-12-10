import { getAllLandscapes } from "@/lib/data/landscapes";
import Link from "next/link";
import { Heart, Calendar, ArrowLeft } from "lucide-react";
import { GlobalMoodMap } from "@/components/landscape/GlobalMood";

export const metadata = {
  title: "Gallery | Emotion Landscape",
  description: "Explore emotional landscapes created by the community",
};

export default async function GalleryPage() {
  const landscapes = await getAllLandscapes();

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-bold text-white mb-4">
              Landscape Gallery
            </h1>
            <p className="text-gray-400 text-lg">
              Explore emotional landscapes created by our community. Each
              landscape represents a unique emotional journey.
            </p>
          </div>

          <div className="lg:col-span-1">
            <GlobalMoodMap />
          </div>
        </div>

        {landscapes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landscapes.map((landscape) => (
              <Link
                key={landscape.id}
                href={`/landscape/${landscape.id}`}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105 group"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {landscape.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {landscape.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(landscape.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    {landscape.likes}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-lg shadow-lg"
                    style={{
                      backgroundColor: landscape.params.colors.primary,
                      boxShadow: `0 4px 20px ${landscape.params.colors.primary}40`,
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-white capitalize font-semibold text-lg">
                      {landscape.analysis.dominant}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {Math.round(landscape.analysis.intensity * 100)}%
                      intensity
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-400 text-lg mb-4">
              No landscapes yet. Be the first to create one!
            </p>
            <Link
              href="/create"
              className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold"
            >
              Create Landscape
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
