import React, { useContext } from "react";
import { Tooltip } from "@chakra-ui/react";
import TrashIcon from "components/icons/TrashIcon";
import IconButton from "components/shared/IconButton";
import { FormattedMessage, useIntl } from "react-intl";
import ChatContext from "contexts/ChatContext";
import useFactoryAddress from "hooks/useFactoryAddress";
import useSignedContract from "hooks/useSignedContract";
import useContractFunction from "hooks/useContractFunction";
import useContractFunctionErrorSnackbar from "hooks/useContractFunctionErrorSnackbar";
import { utils } from "ethers";
import { factoryAbi } from "app/abis";

const ChatHeaderRemove: React.FC = () => {
  const { formatMessage } = useIntl();
  const {
    chat: { id },
  } = useContext(ChatContext);
  const factoryAddress = useFactoryAddress();
  const factoryContract = useSignedContract(factoryAbi, factoryAddress);
  const { send, state } = useContractFunction("removeChat", factoryContract);
  useContractFunctionErrorSnackbar(state);

  const handleRemove = async () => {
    await send(utils.id(id));
  };

  return (
    <Tooltip
      label={<FormattedMessage id="common.remove-chat" />}
      placement="top"
    >
      <IconButton
        aria-label={formatMessage({ id: "common.remove-chat" })}
        isLoading={
          state.status === "pending" ||
          state.status === "minting" ||
          state.status === "success"
        }
        icon={TrashIcon}
        onClick={handleRemove}
      />
    </Tooltip>
  );
};

export default ChatHeaderRemove;
