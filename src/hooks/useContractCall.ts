import { useCallback } from "react";
import { Contract } from "ethers";

const useContractCall = (method: string, contract?: Contract) => {
  return useCallback(
    async (
      args: any[],
      { signal }: { signal?: AbortSignal } = {}
    ): Promise<[any[]]> => {
      const results = await contract!.functions[method](...args);
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      return results;
    },
    [contract, method]
  );
};

export default useContractCall;
