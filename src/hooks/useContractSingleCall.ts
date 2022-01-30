import { useEthers } from "@usedapp/core";
import { Contract, ContractInterface } from "ethers";
import { useEffect, useState } from "react";
import { False } from "types/utilities";

const useContractSingleCall = <T extends any>(
  call?:
    | {
        abi: ContractInterface;
        address: string;
        method: string;
        args: any[];
      }
    | False
) => {
  const { library } = useEthers();
  const [results, setResults] = useState<T>();

  useEffect(() => {
    if (!library || !call) {
      return;
    }

    let unmounted = false;
    const contract = new Contract(call.address, call.abi, library);
    (async () => {
      try {
        const res = await contract.functions[call.method](...call.args);
        if (!unmounted) {
          setResults(res);
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [library, JSON.stringify(call)]);

  return { results, setResults };
};

export default useContractSingleCall;
