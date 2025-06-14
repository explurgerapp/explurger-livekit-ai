import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useCallback, useState, useEffect } from "react";

import Playground from "@/components/playground/Playground";
import { PlaygroundToast } from "@/components/toast/PlaygroundToast";
import { ConfigProvider, useConfig } from "@/hooks/useConfig";
import {
  ConnectionProvider,
  useConnection,
} from "@/hooks/useConnection";
import { useMemo } from "react";
import { ToastProvider, useToast } from "@/components/toast/ToasterProvider";

const themeColors = [
  "lime",
  "cyan",
  "green",
  "amber",
  "blue",
  "violet",
  "rose",
  "pink",
  "teal",
];

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ToastProvider>
      <ConfigProvider>
        <ConnectionProvider>
          <HomeInner />
        </ConnectionProvider>
      </ConfigProvider>
    </ToastProvider>
  );
}

export function HomeInner() {
  const { shouldConnect, wsUrl, token, mode, connect, disconnect } =
    useConnection();

  const { config } = useConfig();
  const { toastMessage, setToastMessage } = useToast();

  const handleConnect = useCallback(
    async (c: boolean) => {
      // Automatically connect using environment variables
      c ? connect("env") : disconnect();
    },
    [connect, disconnect],
  );

  // Auto-connect on component mount
  useEffect(() => {
    if (!shouldConnect) {
      handleConnect(true);
    }
  }, [handleConnect, shouldConnect]);


  return (
    <>
      <Head>
        <title>Nivu - Your Explurger AI Assistant</title>
        <meta name="description" content={config.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          property="og:image"
          content="https://livekit.io/images/og/agents-playground.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center px-4 items-center h-full w-full">
          <LiveKitRoom
            className="flex flex-col h-full w-full"
            serverUrl={wsUrl}
            token={token}
            connect={shouldConnect}
            onError={(e) => {
              setToastMessage({ message: e.message, type: "error" });
              console.error(e);
            }}
          >
            <Playground
              themeColors={themeColors}
              onConnect={(c) => {
                handleConnect(c);
              }}
            />
            <RoomAudioRenderer />
            <StartAudio label="Click to enable audio playback" />
          </LiveKitRoom>
      </main>
    </>
  );
}
