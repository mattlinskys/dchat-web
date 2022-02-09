import React, { useMemo } from "react";
import {
  POLYGON_MAINNET,
  POLYGON_TESTNET,
  HARDHAT_LOCALHOST,
} from "constants/chains";
import ChainsContext, { ChainsContextValue } from "contexts/ChainsContext";
import { useEthers } from "@usedapp/core";

const ChainsProvider: React.FC = ({ children }) => {
  const chains = useMemo(
    () => [POLYGON_MAINNET, POLYGON_TESTNET, HARDHAT_LOCALHOST],
    []
  );
  const targetChain = useMemo(
    () =>
      chains.find(
        (chain) => chain.id.toString() === process.env.REACT_APP_TARGET_CHAIN_ID
      )!,
    [chains]
  );
  const { chainId } = useEthers();
  const activeChain = useMemo(
    () => chainId && chains.find((chain) => chain.id === chainId),
    [chainId, chains]
  );

  const value = useMemo<ChainsContextValue>(
    () => ({
      chains,
      targetChain,
      activeChain,
    }),
    [chains, targetChain, activeChain]
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};

export default ChainsProvider;
