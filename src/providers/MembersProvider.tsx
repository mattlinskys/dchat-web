import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import ChatContext from "contexts/ChatContext";
import useConnectedContract from "hooks/useConnectedContract";
import { chatAbi } from "app/abis";
import useContractEvents from "hooks/useContractEvents";
import { createEntitiesReducer } from "reducers/entitiesReducer";
import { IMember } from "types/chat";
import MembersContext from "contexts/MembersContext";

const reducer = createEntitiesReducer<IMember, "account">("account");

const MembersProvider: React.FC = ({ children }) => {
  const {
    chat: { address },
  } = useContext(ChatContext);
  const [{ entities: members, isFetching }, dispatch] = useReducer(reducer, {
    entities: [],
    isFetching: true,
  });
  const chatContract = useConnectedContract(chatAbi, address);

  const fetchMembers = useCallback(async () => {
    // TODO:
  }, [chatContract]);

  useEffect(() => {
    if (chatContract) {
      fetchMembers();
    }
  }, [chatContract]);

  useContractEvents(chatContract, "MemberAdded", async (account: string) => {
    // TODO:
    // const result = await chatContract!.functions.members(account);
    // dispatch({
    //   type: "add-one",
    //   entity:
    // });
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
