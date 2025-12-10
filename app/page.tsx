import { getFeaturedLandscapes } from "@/lib/data/landscapes";
import Link from "next/link";
import { Sparkles, Heart, TrendingUp } from "lucide-react";

export default async function Home() {
  const featured = await getFeaturedLandscapes(6);

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 to-black">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            🌈 Emotion Landscape Generator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your feelings into beautiful 3D landscapes. AI analyzes
            your emotions and creates unique terrain visualizations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/create"
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-lg flex items-center gap-2"
            >
              <Sparkles size={24} />
              Create Your Landscape
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-lg flex items-center gap-2"
            >
              <TrendingUp size={24} />
              Explore Gallery
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              ✨ Featured Landscapes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((landscape) => (
                <Link
                  key={landscape.id}
                  href={`/landscape/${landscape.id}`}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {landscape.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {landscape.text}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{
                        backgroundColor: landscape.params.colors.primary,
                      }}
                    />
                    <div>
                      <div className="text-white capitalize font-semibold">
                        {landscape.analysis.dominant}
                      </div>
                      <div className="text-gray-400 text-sm flex items-center gap-1">
                        <Heart size={14} />
                        {landscape.likes}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
