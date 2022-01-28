import type { IChain } from "types/chain";

export const POLYGON_MAINNET: IChain = {
  id: 137,
  name: "Polygon Mainnet",
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"],
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
};

export const POLYGON_TESTNET: IChain = {
  id: 80001,
  name: "Matic Mumbai",
  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
};
