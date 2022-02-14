import useConnectedContract from "hooks/useConnectedContract";
import useContractEvents from "hooks/useContractEvents";
import useFactoryAddress from "hooks/useFactoryAddress";
import { factoryAbi } from "app/abis";
import { utils } from "ethers";

const useChatRemovedEvents = (id: string, cb: () => void) => {
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);

  useContractEvents(
    factoryContract,
    {
      address: factoryAddress,
      topics: [
        utils.id("ChatRemoved(address,bytes32)"),
        // @ts-ignore
        null,
        utils.id(id),
      ],
    },
    cb
  );
};

export default useChatRemovedEvents;
