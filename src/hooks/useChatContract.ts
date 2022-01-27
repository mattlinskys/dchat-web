import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { chatAbi } from "app/abis";

const useChatContract = (address: string) =>
  useMemo(() => new Contract(address, chatAbi), [address]);

export default useChatContract;
