import { useCallback } from "react";
import {
  ChainCall,
  multicall,
  useBlockNumber,
  useEthers,
  useMulticallAddress,
} from "@usedapp/core";

const useMulticall = () => {
  const { library } = useEthers();
  const multicallAddress = useMulticallAddress();
  const blockNumber = useBlockNumber();

  return useCallback(
    async (calls: ChainCall[], { signal }: { signal?: AbortSignal } = {}) => {
      const results = await multicall(
        library!,
        multicallAddress!,
        blockNumber!,
        calls
      );
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      return results;
    },
    [library, multicallAddress, blockNumber]
  );
};

export default useMulticall;
