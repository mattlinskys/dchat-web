import { Contract } from "ethers";
import useContractCall from "hooks/useContractCall";
import { useEffect, useState } from "react";

const useContractAutoCall = ({
  method,
  contract,
  args,
}: {
  method: string;
  args: any[];
  contract?: Contract;
}) => {
  const call = useContractCall(method, contract);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setResults(await call(args, { signal: controller.signal }));
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [call]);

  return results;
};

export default useContractAutoCall;
