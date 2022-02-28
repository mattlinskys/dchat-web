import { chain, Chain } from "wagmi";

export const hardhat: Chain = {
  ...chain.localhost,
  id: 31337,
};

export const SUPPORTED_CHAINS = [
  chain.polygonMainnet,
  chain.polygonTestnetMumbai,
  hardhat,
];

export const MULTICALL_ADDRESSES = {
  [chain.polygonMainnet.id]: "0x275617327c958bD06b5D6b871E7f491D76113dd8",
  [chain.polygonTestnetMumbai.id]: "0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631",
  [hardhat.id]: process.env.REACT_APP_LOCALNODE_MULTICALL_ADDRESS,
};
