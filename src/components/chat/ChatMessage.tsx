type ChatMessageProps = {
  message: string;
  accentColor: string;
  name: string;
  isSelf: boolean;
  hideName?: boolean;
};

export const ChatMessage = ({
  name,
  message,
  accentColor,
  isSelf,
  hideName,
}: ChatMessageProps) => {
  const bubbleAlignment = isSelf ? "self-end" : "self-start";
  const bubbleColor = isSelf ? `bg-lime-600` : "bg-gray-200";
  const textColor = isSelf ? "text-white" : "text-gray-900";

  return (
    <div
      className={`flex flex-col gap-1 w-full my-1 ${
        hideName ? "pt-0" : "pt-2"
      }`}
    >
      {!hideName && (
        <div
          className={`text-xs text-gray-500 ${
            isSelf ? "text-right" : "text-left"
          } px-2`}
        >
          {name}
        </div>
      )}
      <div
        className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-line ${bubbleAlignment} ${bubbleColor} ${textColor}`}
      >
        {message}
      </div>
    </div>
  );
};
