import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import useFactoryAddress from "hooks/useFactoryAddress";
import useConnectedContract from "hooks/useConnectedContract";
import useContractEvents from "hooks/useContractEvents";
import { chatAbi, factoryAbi, profileAbi } from "app/abis";
import { createEntitiesReducer } from "reducers/entitiesReducer";
import { IMember } from "types/chat";
import ChatContext from "contexts/ChatContext";
import MembersContext from "contexts/MembersContext";
import {
  multicall,
  useBlockNumber,
  useEthers,
  useMulticallAddress,
} from "@usedapp/core";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";

const reducer = createEntitiesReducer<IMember, "account">("account");

const MembersProvider: React.FC = ({ children }) => {
  const factoryAddress = useFactoryAddress();
  const {
    chat: { id: chatId, address },
  } = useContext(ChatContext);
  const [{ entities: members, isFetching }, dispatch] = useReducer(reducer, {
    entities: [],
    isFetching: true,
  });
  const { library } = useEthers();
  const multicallAddress = useMulticallAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);
  const chatContract = useConnectedContract(chatAbi, address);
  const blockNumber = useBlockNumber();

  // TODO: try/catch
  const fetchMembers = useCallback(async () => {
    dispatch({ type: "fetch-pending" });

    const [membersAccounts] = await chatContract!.functions.membersAccounts();
    const profileAddressCalls = (membersAccounts as string[]).map(
      (account) => ({
        address: factoryAddress,
        data: factoryAbi.encodeFunctionData("profiles", [account]),
      })
    );

    const profileAddressesResult = await multicall(
      library!,
      multicallAddress!,
      blockNumber!,
      profileAddressCalls
    );

    const profileAddresses = [];
    for (const { address, data } of profileAddressCalls) {
      const [profileAddress] = factoryAbi.decodeFunctionResult(
        "profiles",
        profileAddressesResult[address]![data]!
      );
      profileAddresses.push(profileAddress);
    }

    const profilesResult = await multicall(
      library!,
      multicallAddress!,
      blockNumber!,
      profileAddresses
        .map((profileAddress) =>
          ["name", "encryptionPublicKey"].map((method) => ({
            address: profileAddress,
            data: profileAbi.encodeFunctionData(method),
          }))
        )
        .flat()
    );

    const entities: IMember[] = [];
    for (const [i, profileAddress] of profileAddresses.entries()) {
      if (isAddressZero(profileAddress)) {
        entities.push({ account: membersAccounts[i] });
      } else {
        entities.push({
          account: membersAccounts[i],
          profile: {
            name: utils.parseBytes32String(
              profilesResult[profileAddress]![
                profileAbi.encodeFunctionData("name")
              ]!
            ),
            account: membersAccounts[i],
            address: profileAddress,
            encryptionPublicKey:
              profilesResult[profileAddress]![
                profileAbi.encodeFunctionData("encryptionPublicKey")
              ]!,
          },
        });
      }
    }

    dispatch({ type: "fetch-fulfilled", entities });
  }, [
    factoryAddress,
    blockNumber,
    library,
    multicallAddress,
    factoryContract,
    chatContract,
  ]);

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [chatId]);

  // TODO: Synchronize every now and then
  useEffect(() => {
    if (
      blockNumber &&
      library &&
      multicallAddress &&
      factoryContract &&
      chatContract
    ) {
      fetchMembers();
    }
  }, [
    !!blockNumber,
    !!library,
    !!multicallAddress,
    factoryContract,
    chatContract,
  ]);

  useContractEvents(chatContract, "MemberAdded", async (account: string) => {
    // TODO: try/catch
    const [profileAddress] = await factoryContract!.functions.profiles(account);
    if (isAddressZero(profileAddress)) {
      dispatch({
        type: "add-one",
        entity: { account },
      });
    } else {
      const profileResult = await multicall(
        library!,
        multicallAddress!,
        blockNumber!,
        ["name", "encryptionPublicKey"].map((method) => ({
          address: profileAddress,
          data: profileAbi.encodeFunctionData(method),
        }))
      );

      dispatch({
        type: "add-one",
        entity: {
          account,
          profile: {
            name: utils.parseBytes32String(
              profileResult[profileAddress]![
                profileAbi.encodeFunctionData("name")
              ]!
            ),
            account,
            address: profileAddress,
            encryptionPublicKey:
              profileResult[profileAddress]![
                profileAbi.encodeFunctionData("encryptionPublicKey")
              ]!,
          },
        },
      });
    }
  });

  useContractEvents(chatContract, "MemberRemoved", (account: string) => {
    dispatch({ type: "remove-one", id: account });
  });

  const value = useMemo(
    () => ({
      members,
      isFetching,
    }),
    [members, isFetching]
  );

  return (
    <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
  );
};

export default MembersProvider;
