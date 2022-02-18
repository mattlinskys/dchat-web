import { constants, utils } from "ethers";

export const shortenAddress = (address: string, magnitude = 4) =>
  `${address.slice(0, magnitude + 2)}...${address.slice(-magnitude)}`;

export const isAddressZero = (address: string) =>
  address === constants.AddressZero;

export const compareAddresses = (a: string, b: string) =>
  utils.getAddress(a) === utils.getAddress(b);
