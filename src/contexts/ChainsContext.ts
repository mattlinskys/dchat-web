import { createContext } from "react";
import { IChain } from "types/chain";

export interface ChainsContextValue {
  chains: IChain[];
  targetChain: IChain;
  activeChain?: IChain;
}

const ChainsContext = createContext<ChainsContextValue | undefined>(undefined);

export default ChainsContext;
