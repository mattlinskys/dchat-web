import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import MessagesContext from "contexts/MessagesContext";
import ChatContext from "contexts/ChatContext";
import { IMessage } from "types/message";
import useConnectedContract from "hooks/useConnectedContract";
import { chatAbi } from "app/abis";
import useContractEvents from "hooks/useContractEvents";
import { BigNumber } from "ethers";
import { rawResultToMessage } from "utils/abiUtils";
import { createEntitiesReducer } from "reducers/entitiesReducer";

const reducer = createEntitiesReducer<IMessage, "id">("id", (a, b) => a.eq(b));

const MessagesProvider: React.FC = ({ children }) => {
  const {
    chat: { address, messagesCount },
  } = useContext(ChatContext);
  const [{ entities: messages, isFetching }, dispatch] = useReducer(reducer, {
    entities: [],
    isFetching: !messagesCount.isZero(),
  });
  const chatContract = useConnectedContract(chatAbi, address);

  const fetchMessages = useCallback(async () => {
    const take = Math.min(messagesCount.toNumber() - messages.length, 5);
    const skip = Math.max(messagesCount.toNumber() - messages.length - take, 0);
    if (take <= 0) {
      return;
    }

    dispatch({ type: "fetch-pending" });

    try {
      const [results] = (await chatContract!.functions.paginateMessages(
        skip,
        take
      )) as [any[]];
      const entities = results.map(rawResultToMessage);

      dispatch({ type: "fetch-fulfilled", entities });
    } catch (err) {
      // TODO: fetch-rejected action
    }
  }, [messages.length, messagesCount, chatContract]);

  useEffect(() => {
    if (!messagesCount.isZero() && chatContract) {
      fetchMessages();
    }
  }, [chatContract]);

  useContractEvents(chatContract, "MsgSent", async (id: BigNumber) => {
    const result = await chatContract!.functions.messages(id);
    dispatch({
      type: "add-one",
      entity: rawResultToMessage(result),
    });
  });

  useContractEvents(chatContract, "MsgRemoved", (id: BigNumber) => {
    dispatch({ type: "remove-one", id });
  });

  const value = useMemo(
    () => ({
      messages,
      isFetching,
      fetchNextMessages: fetchMessages,
    }),
    [messages, isFetching]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
