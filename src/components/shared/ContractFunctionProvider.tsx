import React from "react";
import { useContractFunction } from "@usedapp/core";
import { ContractInterface } from "ethers";
import useContract from "hooks/useContract";

export interface ContractFunctionProviderProps {
  address: string;
  abi: ContractInterface;
  name: string;
  children: (props: ReturnType<typeof useContractFunction>) => React.ReactNode;
}

const ContractFunctionProvider: React.FC<ContractFunctionProviderProps> = ({
  address,
  abi,
  name,
  children,
}) => {
  const contract = useContract(abi, address);
  const { send, state, events, resetState } = useContractFunction(
    contract,
    name
  );

  return children({ send, state, events, resetState }) as React.ReactElement;
};

export default ContractFunctionProvider;
