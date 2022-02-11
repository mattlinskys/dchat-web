import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import MessagesContext from "contexts/MessagesContext";
import ChatContext from "contexts/ChatContext";
import useConnectedContract from "hooks/useConnectedContract";
import { chatAbi } from "app/abis";
import useContractEvents from "hooks/useContractEvents";
import { BigNumber } from "ethers";
import { rawResultToMessage } from "utils/abiUtils";
import {
  createEntitiesReducer,
  entitiesReducerDefaultState,
} from "reducers/entitiesReducer";
import { TChatEntry } from "types/chat";

interface MessagesProviderProps {
  fetchTake?: number;
}

const reducer = createEntitiesReducer<TChatEntry, "id">("id");

const MessagesProvider: React.FC<MessagesProviderProps> = ({
  fetchTake = 10,
  children,
}) => {
  const {
    chat: { address, messagesCount },
  } = useContext(ChatContext);
  const [{ entities: chatEntries, isFetching, isInitialized }, dispatch] =
    useReducer(reducer, {
      ...entitiesReducerDefaultState,
      isInitialized: !!messagesCount.isZero(),
    });
  const messageEntriesCount = useMemo(
    () => chatEntries.filter((entry) => entry.type === "message").length,
    [chatEntries]
  );
  const chatContract = useConnectedContract(chatAbi, address);

  const fetchMessages = useCallback(async () => {
    const take = Math.min(
      messagesCount.toNumber() - messageEntriesCount,
      fetchTake
    );
    const skip = Math.max(
      messagesCount.toNumber() - messageEntriesCount - take,
      0
    );
    if (take <= 0) {
      return;
    }

    dispatch({ type: "fetch-pending" });

    try {
      const [results] = (await chatContract!.functions.paginateMessages(
        skip,
        take
      )) as [any[]];

      dispatch({
        type: "fetch-fulfilled",
        entities: results.map(rawResultToMessage).map((msg) => ({
          id: msg.id.toString(),
          type: "message",
          item: msg,
          createdAt: msg.sentAt,
        })),
      });
    } catch (err) {
      // TODO: fetch-rejected action
    }
  }, [fetchTake, messageEntriesCount, messagesCount, chatContract]);

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [chatContract]);

  useEffect(() => {
    if (!isInitialized) {
      fetchMessages();
    }
  }, [isInitialized]);

  useContractEvents(chatContract, "MsgSent", async (id: BigNumber) => {
    const result = await chatContract!.functions.messages(id);
    const message = rawResultToMessage(result);
    dispatch({
      type: "upsert-one",
      entity: {
        id: message.id.toString(),
        type: "message",
        item: message,
        createdAt: message.sentAt,
      },
    });
  });

  useContractEvents(chatContract, "MsgRemoved", (id: BigNumber) => {
    dispatch({ type: "remove-one", id: id.toString() });
  });

  useContractEvents(
    chatContract,
    "MemberAdded",
    (account: string, { transactionHash }) => {
      dispatch({
        type: "add-one",
        entity: {
          id: transactionHash + account,
          type: "member-added",
          item: { account },
          createdAt: new Date(),
        },
      });
    }
  );

  useContractEvents(
    chatContract,
    "MemberRemoved",
    (account: string, { transactionHash }) => {
      dispatch({
        type: "add-one",
        entity: {
          id: transactionHash + account,
          type: "member-removed",
          item: { account },
          createdAt: new Date(),
        },
      });
    }
  );

  const addPendingMessage = useCallback((id: BigNumber, sender: string) => {
    const message = {
      id,
      sender,
      sentAt: new Date(),
    };
    dispatch({
      type: "add-one",
      entity: {
        id: message.id.toString(),
        type: "pending-message",
        item: message,
        createdAt: message.sentAt,
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      chatEntries,
      isFetching,
      isInitialized,
      fetchNextMessages: fetchMessages,
      addPendingMessage,
    }),
    [chatEntries, isFetching, isInitialized, fetchMessages, addPendingMessage]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
