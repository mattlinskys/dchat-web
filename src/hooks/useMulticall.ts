import { useCallback } from "react";
import { useProvider } from "wagmi";
import useMulticallAddress from "hooks/useMulticallAddress";
import { Contract } from "ethers";
import { multicall2Abi } from "app/abis";

const useMulticall = () => {
  const provider = useProvider();
  const multicallAddress = useMulticallAddress();

  return useCallback(
    async (
      calls: {
        address: string;
        data: string;
      }[],
      { signal }: { signal?: AbortSignal } = {}
    ) => {
      const contract = new Contract(multicallAddress!, multicall2Abi, provider);
      const results: [boolean, string][] = await contract.tryAggregate(
        false,
        calls.map(({ address, data }) => [address, data])
      );

      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      return results;
    },
    [provider, multicallAddress]
  );
};

export default useMulticall;
