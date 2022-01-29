import React, { useEffect, useMemo, useState } from "react";
import { POLYGON_MAINNET, POLYGON_TESTNET } from "constants/chains";
import ChainsContext, { ChainsContextValue } from "contexts/ChainsContext";
import { CHAIN_ID } from "constants/tokens";

const ChainsProvider: React.FC = ({ children }) => {
  const chains = useMemo(() => [POLYGON_MAINNET, POLYGON_TESTNET], []);
  const [activeChainId, setActiveChainId] = useState<number>(
    () => parseInt(localStorage.getItem(CHAIN_ID)!) || POLYGON_MAINNET.id
  );

  useEffect(() => {
    localStorage.setItem(CHAIN_ID, activeChainId.toString());
  }, [activeChainId]);

  const value = useMemo<ChainsContextValue>(
    () => ({
      chains,
      activeChain: chains.find(({ id }) => id === activeChainId) || chains[0],
      setActiveChain: setActiveChainId,
    }),
    [chains, activeChainId]
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};

export default ChainsProvider;
