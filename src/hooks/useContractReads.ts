import { useEffect, useMemo, useState } from "react";
import useBlockNumber from "hooks/useBlockNumber";
import { Interface } from "ethers/lib/utils";
import useMulticall from "hooks/useMulticall";

const useContractReads = (
  reads:
    | {
        abi: Interface;
        address: string;
        method: string;
        args?: any[];
      }[]
    | undefined,
  { watch }: { watch?: boolean } = {}
) => {
  const [results, setResults] = useState<any[]>([]);
  const multicall = useMulticall();
  const blockNumber = useBlockNumber();
  const readsStr = useMemo(() => JSON.stringify(reads), [reads]);

  useEffect(() => {
    setResults([]);
  }, [readsStr, multicall]);

  useEffect(() => {
    if (!reads || reads.length === 0) {
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const multicallResults = await multicall(
          reads.map(({ abi, address, method, args }) => ({
            address,
            data: abi.encodeFunctionData(method, args),
          })),
          { signal: controller.signal }
        );
        setResults(
          multicallResults.map(([, data], i) => {
            const { abi, method } = reads[i];
            return abi.decodeFunctionResult(method, data);
          })
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [multicall, readsStr, watch && blockNumber]);

  return results;
};

export default useContractReads;
