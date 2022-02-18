import { useMemo } from "react";
import { Contract, ContractInterface } from "ethers";
import { useSigner } from "wagmi";

const useSignedContract = (abi: ContractInterface, address?: string) => {
  const [{ data: signer }] = useSigner();
  return useMemo(
    () =>
      (signer && address && new Contract(address, abi, signer)) as
        | Contract
        | undefined,
    [signer, abi, address]
  );
};

export default useSignedContract;
