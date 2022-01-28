export const shortenAddress = (address: string, magnitude = 4) =>
  `${address.slice(0, magnitude + 2)}...${address.slice(-4)}`;
