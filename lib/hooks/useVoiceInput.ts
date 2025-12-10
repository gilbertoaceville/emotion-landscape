"use client";

import { useState, useRef, useCallback } from "react";

interface UseVoiceInputReturn {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  isSupported: boolean;
}

export function useVoiceInput(
  onTranscript?: (text: string) => void
): UseVoiceInputReturn {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<unknown>(null);

  const isSupported =
    typeof window !== "undefined" &&
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);

  const startRecording = useCallback(() => {
    if (!isSupported) return;

    try {
      const SpeechRecognition =
        (
          window as unknown as {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).SpeechRecognition ||
        (
          window as unknown as {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).webkitSpeechRecognition;
      const recognition = new (SpeechRecognition as new () => {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onstart: (() => void) | null;
        onend: (() => void) | null;
        onerror: (() => void) | null;
        onresult:
          | ((event: {
              results: {
                [key: number]: { [key: number]: { transcript: string } };
              };
            }) => void)
          | null;
        start(): void;
        stop(): void;
      })();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: {
        results: { [key: number]: { [key: number]: { transcript: string } } };
      }) => {
        const result = event.results[0][0].transcript;
        if (onTranscript) {
          onTranscript(result + " ");
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error("Speech recognition error:", error);
      setIsRecording(false);
    }
  }, [isSupported, onTranscript]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      (recognitionRef.current as { stop(): void }).stop();
    }
    setIsRecording(false);
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    isSupported,
  };
}
