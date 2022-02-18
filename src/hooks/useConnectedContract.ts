import { useMemo } from "react";
import { Contract, ContractInterface } from "ethers";
import { useProvider } from "wagmi";

const useConnectedContract = (abi: ContractInterface, address?: string) => {
  const provider = useProvider();
  return useMemo(
    () =>
      (provider && address && new Contract(address, abi, provider)) as
        | Contract
        | undefined,
    [provider, abi, address]
  );
};

export default useConnectedContract;
