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

interface State {
  messages: IMessage[];
  isFetching: boolean;
}

type Action =
  | {
      type: "fetch-pending";
    }
  | {
      type: "fetch-fulfilled";
      messages: IMessage[];
    }
  | {
      type: "add-msg";
      message: IMessage;
    }
  | {
      type: "remove-msg";
      id: BigNumber;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "fetch-pending":
      return {
        ...state,
        isFetching: true,
      };
    case "fetch-fulfilled":
      return {
        ...state,
        isFetching: false,
        messages: [
          ...action.messages.filter(
            (msg) => !state.messages.some(({ id }) => msg.id.eq(id))
          ),
          ...state.messages,
        ],
      };
    case "add-msg":
      return {
        ...state,
        messages: [
          ...state.messages,
          ...(state.messages.some(({ id }) => action.message.id.eq(id))
            ? []
            : [action.message]),
        ],
      };
    case "remove-msg":
      return {
        ...state,
        messages: state.messages.filter(({ id }) => !id.eq(action.id)),
      };
    default:
      return state;
  }
};

const MessagesProvider: React.FC = ({ children }) => {
  const {
    chat: { address, messagesCount },
  } = useContext(ChatContext);
  const [{ messages, isFetching }, dispatch] = useReducer(reducer, {
    messages: [],
    isFetching: !messagesCount.isZero(),
  });
  const chatContract = useConnectedContract(chatAbi, address);

  const fetchMessages = useCallback(async () => {
    const take = Math.min(messagesCount.toNumber() - messages.length, 5);
    const skip = Math.max(messagesCount.toNumber() - messages.length - take, 0);
    if (take <= 0) {
      return;
    }

    // TODO: fetch-rejected action
    dispatch({ type: "fetch-pending" });

    const [results] = (await chatContract!.functions.paginateMessages(
      skip,
      take
    )) as [any[]];
    const newMessages = results.map(rawResultToMessage);

    dispatch({ type: "fetch-fulfilled", messages: newMessages });
  }, [messages.length, messagesCount]);

  useEffect(() => {
    if (!messagesCount.isZero() && chatContract) {
      fetchMessages();
    }
  }, [chatContract]);

  useContractEvents(chatContract, "MsgSent", async (id: BigNumber) => {
    const result = await chatContract!.functions.messages(id);
    dispatch({
      type: "add-msg",
      message: rawResultToMessage(result),
    });
  });

  useContractEvents(chatContract, "MsgRemoved", (id: BigNumber) => {
    dispatch({ type: "remove-msg", id });
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
