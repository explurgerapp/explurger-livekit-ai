import { useCallback, useState } from "react";
import { MicrophoneIcon } from "../playground/icons";

type ChatMessageInput = {
  placeholder: string;
  accentColor: string;
  height: number;
  onSend?: (message: string) => void;
};

export const ChatMessageInput = ({
  placeholder,
  accentColor,
  height,
  onSend,
}: ChatMessageInput) => {
  const [message, setMessage] = useState("");

  const handleSend = useCallback(() => {
    if (!onSend) {
      return;
    }
    if (message === "") {
      return;
    }

    onSend(message);
    setMessage("");
  }, [onSend, message]);

  return (
    <div
      className="flex flex-row gap-2 items-center border-t border-t-gray-200 bg-white p-4"
      style={{ height: height }}
    >
      <input
        className={`flex-grow text-sm bg-gray-100 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500`}
        placeholder={placeholder}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      ></input>
      <button
        disabled={message.length === 0 || !onSend}
        onClick={handleSend}
        className={`text-sm uppercase text-white bg-lime-600 hover:bg-lime-700 p-3 rounded-lg disabled:opacity-50`}
      >
        Send
      </button>
      <button className="p-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700">
        <MicrophoneIcon />
      </button>
    </div>
  );
};
