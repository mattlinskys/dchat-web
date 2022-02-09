import { createContext } from "react";

export interface CachedChatsContextValue {
  chatIds: string[];
  pushChatId: (id: string) => void;
  removeChatId: (id: string) => void;
}

const CachedChatsContext = createContext<CachedChatsContextValue>(
  // @ts-ignore
  undefined
);

export default CachedChatsContext;
