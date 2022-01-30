import { useMemo } from "react";
import { Contract, ContractInterface } from "ethers";
import { useEthers } from "@usedapp/core";

const useConnectedContract = (abi: ContractInterface, address?: string) => {
  const { library } = useEthers();
  return useMemo(
    () =>
      (library && address && new Contract(address, abi, library)) as
        | Contract
        | undefined,
    [library, abi, address]
  );
};

export default useConnectedContract;
