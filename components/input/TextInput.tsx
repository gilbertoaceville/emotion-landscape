"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export function TextInput({ onAnalyze, isAnalyzing }: TextInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-700"
      >
        <label className="block text-white text-sm font-semibold mb-3">
          How are you feeling today?
        </label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your thoughts, feelings, or experiences here..."
          className="w-full h-32 px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
          disabled={isAnalyzing}
        />

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-400">{text.length} characters</p>

          <button
            type="submit"
            disabled={isAnalyzing || !text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Landscape
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
