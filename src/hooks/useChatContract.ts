import { useMemo } from "react";
import { Contract } from "ethers";
import { chatAbi } from "app/abis";

const useChatContract = (address: string) =>
  useMemo(() => new Contract(address, chatAbi), [address]);

export default useChatContract;
