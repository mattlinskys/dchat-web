import { useMemo } from "react";
import { Contract, ContractInterface } from "ethers";

const useContract = (abi: ContractInterface, address: string) =>
  useMemo(() => new Contract(address, abi), [address, abi]);

export default useContract;
