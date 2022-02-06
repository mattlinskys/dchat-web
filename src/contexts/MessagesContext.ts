import { createContext } from "react";
import { TChatEntry } from "types/chat";

export interface MessagesContextValue {
  chatEntries: TChatEntry[];
  isFetching: boolean;
  fetchNextMessages: () => void;
}

const MessagesContext = createContext<MessagesContextValue>(
  // @ts-ignore
  undefined
);

export default MessagesContext;
