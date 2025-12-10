'use client';

import { useEffect, useState } from 'react';
import { getGlobalMood } from '@/lib/data/landscapes-client';
import { TrendingUp, Globe, Users } from 'lucide-react';

const emotionEmojis: Record<string, string> = {
  joy: '😊',
  sadness: '😢',
  anger: '😠',
  fear: '😨',
  surprise: '😲',
  disgust: '🤢',
  love: '💕',
  calm: '😌',
  excitement: '🎉',
  nostalgia: '🌅',
  hope: '🌟',
  confusion: '🤔',
};

const emotionColors: Record<string, string> = {
  joy: '#FFD93D',
  sadness: '#6C9BCF',
  anger: '#FF5757',
  fear: '#9B59B6',
  surprise: '#F39C12',
  disgust: '#27AE60',
  love: '#E91E63',
  calm: '#81C784',
  excitement: '#FF6B9D',
  nostalgia: '#FF9A76',
  hope: '#4FC3F7',
  confusion: '#B0BEC5',
};

export function GlobalMoodMap() {
  const [moodData, setMoodData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadMoodData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadMoodData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadMoodData = async () => {
    try {
      const data = await getGlobalMood();
      setMoodData(data);
      const total = Object.values(data).reduce((sum, count) => sum + count, 0);
      setTotalCount(total);
    } catch (error) {
      console.error('Failed to load mood data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedMoods = Object.entries(moodData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  if (loading) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={24} className="text-blue-400 animate-pulse" />
          <h2 className="text-xl font-bold text-white">Global Mood</h2>
        </div>
        <p className="text-gray-400">Loading mood data...</p>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={24} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white">Global Mood</h2>
        </div>
        <p className="text-gray-400">No mood data yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white">Global Mood</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users size={16} />
          <span>{totalCount.toLocaleString()} emotions</span>
        </div>
      </div>

      <div className="space-y-3">
        {sortedMoods.map(([emotion, count], index) => {
          const percentage = (count / totalCount) * 100;
          return (
            <div key={emotion} className="group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{emotionEmojis[emotion] || '😶'}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white capitalize font-semibold">
                        {emotion}
                      </span>
                      {index === 0 && (
                        <TrendingUp size={14} className="text-green-400" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold">
                        {percentage.toFixed(1)}%
                      </span>
                      <span className="text-gray-400 text-sm ml-2">
                        ({count.toLocaleString()})
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: emotionColors[emotion] || '#718096'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          Live data • Updates every 30 seconds
        </p>
      </div>
    </div>
  );
}