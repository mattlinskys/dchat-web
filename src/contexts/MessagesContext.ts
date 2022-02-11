import { BigNumber } from "ethers";
import { createContext } from "react";
import { TChatEntry } from "types/chat";

export interface MessagesContextValue {
  chatEntries: TChatEntry[];
  isFetching: boolean;
  isInitialized: boolean;
  fetchNextMessages: () => void;
  addPendingMessage: (id: BigNumber, sender: string) => void;
}

const MessagesContext = createContext<MessagesContextValue>(
  // @ts-ignore
  undefined
);

export default MessagesContext;
