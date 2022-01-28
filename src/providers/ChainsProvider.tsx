import React, { useMemo, useState } from "react";
import { POLYGON_MAINNET, POLYGON_TESTNET } from "constants/chains";
import ChainsContext, { ChainsContextValue } from "contexts/ChainsContext";

const ChainsProvider: React.FC = ({ children }) => {
  const chains = useMemo(() => [POLYGON_MAINNET, POLYGON_TESTNET], []);
  const [activeChainId, setActiveChainId] = useState<number>(
    POLYGON_MAINNET.id
  );

  const value = useMemo<ChainsContextValue>(
    () => ({
      chains,
      activeChain: chains.find(({ id }) => id === activeChainId)!,
      setActiveChain: setActiveChainId,
    }),
    [chains, activeChainId]
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};

export default ChainsProvider;
