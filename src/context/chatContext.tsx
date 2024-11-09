"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ChatReceiver = {
  userId: string;
  name: string;
};

type ChatContextType = {
  chatReceiver: ChatReceiver;
  setChatReceiver: Dispatch<SetStateAction<ChatReceiver>>;
};

const defaultChatContextValue: ChatContextType = {
  chatReceiver: { userId: "", name: "" },
  setChatReceiver: () => {},
};

const ChatContext = createContext<ChatContextType>(defaultChatContextValue);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatReceiver, setChatReceiver] = useState<ChatReceiver>({
    userId: "",
    name: "",
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedReceiver = localStorage.getItem("chatReceiver");
      if (storedReceiver) {
        setChatReceiver(JSON.parse(storedReceiver));
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("chatReceiver", JSON.stringify(chatReceiver));
    }
  }, [chatReceiver, isInitialized]);

  return (
    <ChatContext.Provider value={{ chatReceiver, setChatReceiver }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider };
