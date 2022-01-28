import type { ContractCall } from "@usedapp/core";
import { customizableAbi } from "app/abis";
import { utils } from "ethers";

export const getCustomKeyCallArgs = (
  address: string,
  key: string
): ContractCall => ({
  abi: customizableAbi,
  address,
  method: "getCustomKey",
  args: [utils.id(key)],
});
