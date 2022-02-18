import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import useFactoryAddress from "hooks/useFactoryAddress";
import useMulticall from "hooks/useMulticall";
import useConnectedContract from "hooks/useConnectedContract";
import useContractEvents from "hooks/useContractEvents";
import { chatAbi, factoryAbi, profileAbi } from "app/abis";
import {
  createEntitiesReducer,
  entitiesReducerDefaultState,
} from "reducers/entitiesReducer";
import { IMember } from "types/chat";
import ChatContext from "contexts/ChatContext";
import MembersContext from "contexts/MembersContext";
import { isAddressZero } from "utils/addressUtils";
import { utils } from "ethers";

const reducer = createEntitiesReducer<IMember, "account">("account");

const MembersProvider: React.FC = ({ children }) => {
  const factoryAddress = useFactoryAddress();
  const {
    chat: { id: chatId, address },
  } = useContext(ChatContext);
  const [{ entities: members, isFetching }, dispatch] = useReducer(
    reducer,
    entitiesReducerDefaultState
  );
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);
  const chatContract = useConnectedContract(chatAbi, address);
  const multicall = useMulticall();

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

    const profileAddressesResult = await multicall(profileAddressCalls);
    const profileAddresses: string[] = [];
    for (const [, data] of profileAddressesResult) {
      const [profileAddress] = factoryAbi.decodeFunctionResult(
        "profiles",
        data
      );
      profileAddresses.push(profileAddress);
    }

    const profilesResult = await multicall(
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
        const [, nameData] = profilesResult[i * 2];
        const [, publicKeyData] = profilesResult[i * 2 + 1];
        const [nameBytes] = profileAbi.decodeFunctionResult("name", nameData);
        const [encryptionPublicKey] = profileAbi.decodeFunctionResult(
          "encryptionPublicKey",
          publicKeyData
        );

        entities.push({
          account: membersAccounts[i],
          profile: {
            name: utils.parseBytes32String(nameBytes),
            account: membersAccounts[i],
            address: profileAddress,
            encryptionPublicKey,
          },
        });
      }
    }

    dispatch({ type: "fetch-fulfilled", entities });
  }, [factoryAddress, multicall, factoryContract, chatContract]);

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [chatId]);

  // TODO: Synchronize every now and then
  useEffect(() => {
    if (factoryContract && chatContract) {
      fetchMembers();
    }
  }, [factoryContract, chatContract]);

  useContractEvents(chatContract, "MemberAdded", async (account: string) => {
    // TODO: try/catch
    const [profileAddress] = await factoryContract!.functions.profiles(account);
    if (isAddressZero(profileAddress)) {
      dispatch({
        type: "add-one",
        entity: { account },
      });
    } else {
      const [[, nameData], [, publicKeyData]] = await multicall(
        ["name", "encryptionPublicKey"].map((method) => ({
          address: profileAddress,
          data: profileAbi.encodeFunctionData(method),
        }))
      );

      const [nameBytes] = profileAbi.decodeFunctionResult("name", nameData);
      const [encryptionPublicKey] = profileAbi.decodeFunctionResult(
        "encryptionPublicKey",
        publicKeyData
      );

      dispatch({
        type: "add-one",
        entity: {
          account,
          profile: {
            name: utils.parseBytes32String(nameBytes),
            account,
            address: profileAddress,
            encryptionPublicKey,
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
