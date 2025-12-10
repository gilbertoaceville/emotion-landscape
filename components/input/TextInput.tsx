"use client";

import { useState } from "react";
import { Loader2, Sparkles, Mic, MicOff } from "lucide-react";
import { useVoiceInput } from "@/lib/hooks/useVoiceInput";

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export function TextInput({ onAnalyze, isAnalyzing }: TextInputProps) {
  const [text, setText] = useState("");
  
  const handleTranscript = (newTranscript: string) => {
    setText(prev => prev + newTranscript);
  };
  
  const { isRecording, startRecording, stopRecording, isSupported } = useVoiceInput(handleTranscript);

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

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your thoughts, feelings, or experiences here..."
            className="w-full h-32 px-4 py-3 pr-12 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
            disabled={isAnalyzing}
          />
          {isSupported && (
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`absolute right-3 top-3 p-2 rounded-lg transition-all ${
                isRecording
                  ? "bg-red-600 hover:bg-red-700 animate-pulse"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              disabled={isAnalyzing}
            >
              {isRecording ? (
                <MicOff size={16} className="text-white" />
              ) : (
                <Mic size={16} className="text-white" />
              )}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-400">{text.length} characters</p>
            {isRecording && (
              <div className="text-sm text-red-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Recording...
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !text.trim()}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all flex items-center gap-2"
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
