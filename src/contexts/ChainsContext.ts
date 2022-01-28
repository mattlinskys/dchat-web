import { createContext } from "react";
import { IChain } from "types/chain";

export interface ChainsContextValue {
  chains: IChain[];
  activeChain: IChain;
  setActiveChain: (id: IChain["id"]) => void;
}

const ChainsContext = createContext<ChainsContextValue | undefined>(undefined);

export default ChainsContext;
