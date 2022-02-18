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
  [chain.polygonMainnet.id]: "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507",
  [chain.polygonTestnetMumbai.id]: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
  [hardhat.id]: process.env.REACT_APP_LOCALNODE_MULTICALL_ADDRESS,
};
