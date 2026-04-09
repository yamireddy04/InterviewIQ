"use client";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Button } from "@/components/ui/Button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { transcribeAudio } from "@/lib/api";

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function AudioRecorder({ onTranscript, disabled }: Props) {
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();
  const [transcribing, setTranscribing] = useState(false);

  useEffect(() => {
    if (!audioBlob) return;
    const run = async () => {
      setTranscribing(true);
      try {
        const { transcript } = await transcribeAudio(audioBlob);
        onTranscript(transcript);
      } finally {
        setTranscribing(false);
      }
    };
    run();
  }, [audioBlob]);

  if (transcribing) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Loader2 size={14} className="animate-spin" />
        Transcribing...
      </div>
    );
  }

  return (
    <Button
      variant={isRecording ? "danger" : "outline"}
      size="sm"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
    >
      {isRecording ? <><MicOff size={14} /> Stop Recording</> : <><Mic size={14} /> Record Answer</>}
    </Button>
  );
}
