import { constants } from "ethers";

export const shortenAddress = (address: string, magnitude = 4) =>
  `${address.slice(0, magnitude + 2)}...${address.slice(-magnitude)}`;

export const isAddressZero = (address: string) =>
  address === constants.AddressZero;
