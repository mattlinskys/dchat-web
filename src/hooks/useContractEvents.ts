import { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Contract, EventFilter } from "ethers";

const useContractEvents = (
  contract: Contract | undefined,
  event: string | EventFilter,
  listener: (...args: any[]) => void
) => {
  const { library } = useEthers();

  useEffect(() => {
    if (!library || !contract) {
      return;
    }

    const connectedContract = contract.connect(library);
    connectedContract.on(event, listener);
    return () => {
      connectedContract.off(event, listener);
    };
  }, [contract, library, event, listener]);
};

export default useContractEvents;
