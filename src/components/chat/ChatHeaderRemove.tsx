import React, { useContext } from "react";
import { Tooltip } from "@chakra-ui/react";
import TrashIcon from "components/icons/TrashIcon";
import IconButton from "components/shared/IconButton";
import { FormattedMessage } from "react-intl";
import useFactoryContract from "hooks/useFactoryContract";
import { useContractFunction } from "@usedapp/core";
import ChatContext from "contexts/ChatContext";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import { utils } from "ethers";

const ChatHeaderRemove: React.FC = () => {
  const {
    chat: { id },
  } = useContext(ChatContext);
  const factoryContract = useFactoryContract();
  const { send, state } = useContractFunction(factoryContract, "removeChat");
  useContractFunctionErrorToast(state);

  const handleRemove = async () => {
    await send(utils.id(id));
  };

  return (
    <Tooltip
      label={<FormattedMessage id="common.remove-chat" />}
      placement="top"
    >
      <IconButton
        aria-label="Remove chat"
        isLoading={
          state.status === "PendingSignature" ||
          state.status === "Mining" ||
          state.status === "Success"
        }
        icon={TrashIcon}
        onClick={handleRemove}
      />
    </Tooltip>
  );
};

export default ChatHeaderRemove;
