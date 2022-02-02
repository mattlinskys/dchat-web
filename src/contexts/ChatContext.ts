import { createContext } from "react";
import { IChat, IMember } from "types/chat";

export interface ChatContextValue {
  chat: IChat;
  members: IMember[];
  isLoaded: boolean;
}

const ChatContext = createContext<ChatContextValue>(
  // @ts-ignore
  undefined
);

export default ChatContext;
