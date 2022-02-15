import { useMemo } from "react";
import { Contract, ContractInterface } from "ethers";
import { useEthers } from "@usedapp/core";

const useConnectedContract = (abi: ContractInterface, address?: string) => {
  const { library } = useEthers();
  return useMemo(
    () =>
      (library &&
        address &&
        // TODO: useSignedContract
        new Contract(address, abi, library.getSigner())) as
        | Contract
        | undefined,
    [library, abi, address]
  );
};

export default useConnectedContract;
