import { useEffect } from "react";
import { Contract, EventFilter } from "ethers";

const useContractEvents = (
  contract: Contract | undefined,
  event: string | EventFilter,
  listener: (...args: any[]) => void
) => {
  useEffect(() => {
    if (!contract) {
      return;
    }

    contract.on(event, listener);
    return () => {
      contract.off(event, listener);
    };
  }, [contract, event, listener]);
};

export default useContractEvents;
