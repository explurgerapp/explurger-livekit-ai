"use client";

import { LoadingSVG } from "@/components/button/LoadingSVG";
import { ChatMessageType, ChatTile } from "@/components/chat/ChatTile";
import { useConfig } from "@/hooks/useConfig";
import { TranscriptionTile } from "@/transcriptions/TranscriptionTile";
import {
  useConnectionState,
  useVoiceAssistant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { ReactNode, useMemo } from "react";

export interface PlaygroundProps {
  logo?: ReactNode;
  themeColors: string[];
  onConnect: (connect: boolean) => void;
}

export default function Playground({
  logo,
  themeColors,
  onConnect,
}: PlaygroundProps) {
  const { config } = useConfig();
  const voiceAssistant = useVoiceAssistant();
  const roomState = useConnectionState();

  const chatTileContent = useMemo(() => {
    if (voiceAssistant.agent) {
      return (
        <TranscriptionTile
          agentAudioTrack={voiceAssistant.audioTrack}
          accentColor={config.settings.theme_color}
        />
      );
    }
    return <div className="flex h-full w-full items-center justify-center text-gray-500">Waiting for agent...</div>;
  }, [
    config.settings.theme_color,
    voiceAssistant.audioTrack,
    voiceAssistant.agent,
  ]);

  if (roomState === ConnectionState.Connecting) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-700 text-center h-full w-full">
        <LoadingSVG />
        Connecting...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Nivu - Your Explurger AI Assistant 🌍
        </h1>
        <p className="text-lg text-gray-600">
          Type or speak your travel questions!
        </p>
      </div>
      <div className="w-full max-w-2xl h-3/4 bg-white rounded-lg shadow-lg flex flex-col">
        {chatTileContent}
      </div>
    </div>
  );
}
