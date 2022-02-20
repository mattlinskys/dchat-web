import { useEffect, useMemo, useState } from "react";
import useContractCall from "hooks/useContractCall";
import useBlockNumber from "hooks/useBlockNumber";
import { Contract } from "ethers";

const useContractRead = ({
  method,
  contract,
  args,
  watch,
}: {
  method: string;
  args: any[];
  contract: Contract | undefined;
  watch?: boolean;
}) => {
  const call = useContractCall(method, contract);
  const [results, setResults] = useState<any[]>([]);
  const blockNumber = useBlockNumber();
  const argsStr = useMemo(() => JSON.stringify(args), [args]);

  useEffect(() => {
    setResults([]);
  }, [argsStr, contract]);

  useEffect(() => {
    if (!contract) {
      return;
    }

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
  }, [call, argsStr, watch && blockNumber]);

  return results;
};

export default useContractRead;
