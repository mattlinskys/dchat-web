import { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { providers, utils } from "ethers";

const useContractEvents = (
  address: string,
  id: string,
  topics: (null | string | string[])[],
  cb: (...args: any[]) => void
) => {
  const { connector } = useEthers();

  useEffect(() => {
    if (!connector) {
      return;
    }

    const eventHandler = (...args: any[]) => {
      console.log("event", args);
      cb(...args);
    };
    const filter = {
      address,
      topics: [utils.id(id), ...topics],
    };

    let unmounted = false;
    let provider: providers.Provider;
    (async () => {
      // TODO: Use library.on
      provider = (await connector.getProvider()) as providers.Provider;
      if (!unmounted) {
        provider.on(filter, eventHandler);
      }
    })();

    return () => {
      unmounted = true;
      provider?.off(filter, eventHandler);
    };
  }, [address, topics, cb]);
};

export default useContractEvents;
