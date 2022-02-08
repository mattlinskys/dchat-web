import React, { useMemo } from "react";
import {
  POLYGON_MAINNET,
  POLYGON_TESTNET,
  HARDHAT_LOCALHOST,
} from "constants/chains";
import ChainsContext, { ChainsContextValue } from "contexts/ChainsContext";
// import { CHAIN_ID } from "constants/tokens";
import { useEthers } from "@usedapp/core";

const ChainsProvider: React.FC = ({ children }) => {
  const chains = useMemo(
    () => [POLYGON_MAINNET, POLYGON_TESTNET, HARDHAT_LOCALHOST],
    []
  );
  // const [activeChainId, setActiveChainId] = useState<number>(
  //   () => parseInt(localStorage.getItem(CHAIN_ID)!) || POLYGON_MAINNET.id
  // );
  const { chainId } = useEthers();
  const activeChain = useMemo(
    () => chainId && chains.find((chain) => chain.id === chainId),
    [chainId, chains]
  );

  // useEffect(() => {
  //   localStorage.setItem(CHAIN_ID, activeChainId.toString());
  // }, [activeChainId]);

  const value = useMemo<ChainsContextValue>(
    () => ({
      chains,
      activeChain,
      // activeChain: chains.find(({ id }) => id === activeChainId) || chains[0],
      // setActiveChain: setActiveChainId,
    }),
    [chains]
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};

export default ChainsProvider;
