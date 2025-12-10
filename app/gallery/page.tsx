import { getAllLandscapes } from '@/lib/data/landscapes';
import Link from 'next/link';
import { Heart, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Gallery | Emotion Landscape',
  description: 'Explore emotional landscapes created by the community',
};

export default async function GalleryPage() {
  const landscapes = await getAllLandscapes();

  return (
    <main className="min-h-screen bg-linear-to-r from-gray-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Landscape Gallery</h1>
          <p className="text-gray-400 text-lg">
            Explore emotional landscapes created by our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landscapes.map((landscape) => (
            <Link
              key={landscape.id}
              href={`/landscape/${landscape.id}`}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {landscape.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {landscape.text}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(landscape?.created_at ?? "0").toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={16} />
                  {landscape.likes}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div 
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: landscape.params.colors.primary }}
                />
                <div className="flex-1">
                  <div className="text-white capitalize font-semibold">
                    {landscape.analysis.dominant}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {Math.round(landscape.analysis.intensity * 100)}% intensity
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {landscapes.length === 0 && (
          <div className="text-center py-20">
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