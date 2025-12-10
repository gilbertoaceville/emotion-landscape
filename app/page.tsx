import { getFeaturedLandscapes } from "@/lib/data/landscapes";
import Link from "next/link";
import { Sparkles, Heart, TrendingUp, Mic } from "lucide-react";
import { GlobalMoodMap } from "@/components/landscape/GlobalMood";

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-white mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-400 text-sm">
                Advanced sentiment analysis transforms your words into emotional
                landscapes
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-3 flex items-center gap-2">
                <Mic size={28} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Voice Input</h3>
              <p className="text-gray-400 text-sm">
                Speak your feelings naturally - voice recognition powered
                creation
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Global Community
              </h3>
              <p className="text-gray-400 text-sm">
                Share your landscapes and explore the collective emotional state
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                🌍 How the World Feels
              </h2>
              <p className="text-gray-400 mb-6">
                Real-time aggregation of emotions from landscapes created around
                the world. See what emotions are trending in our global
                community.
              </p>
              <GlobalMoodMap />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4">
                📊 Platform Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {featured.reduce((sum, l) => sum + l.likes, 0)}
                  </div>
                  <div className="text-gray-400">Total Likes</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    12+
                  </div>
                  <div className="text-gray-400">Emotions Tracked</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 col-span-2">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    Live
                  </div>
                  <div className="text-gray-400">
                    Real-time mood updates every 30 seconds
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/50">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles size={20} />
                  Pro Tip
                </h3>
                <p className="text-gray-300 text-sm">
                  For best results, be detailed and honest about your emotions.
                  The AI can detect subtle nuances in your language!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                ✨ Featured Landscapes
              </h2>
              <Link
                href="/gallery"
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2"
              >
                View All
                <TrendingUp size={20} />
              </Link>
            </div>

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

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-12 border border-blue-500/50">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Create Your Landscape?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Express yourself through AI-generated 3D art. It&apos;s free and takes
              less than a minute.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-lg"
            >
              <Sparkles size={24} />
              Start Creating Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
