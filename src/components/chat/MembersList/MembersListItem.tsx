import React, { useContext } from "react";
import { useEthers } from "@usedapp/core";
import useConnectedContract from "hooks/useConnectedContract";
import useContractFunction from "hooks/useContractFunction";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import useContractFunctionSuccessToast from "hooks/useContractFunctionSuccessToast";
import { ListItem, Tooltip } from "@chakra-ui/react";
import VCard from "components/shared/VCard";
import { FormattedMessage, useIntl } from "react-intl";
import type { IMember } from "types/chat";
import TrashIcon from "components/icons/TrashIcon";
import IconButton from "components/shared/IconButton";
import { chatAbi } from "app/abis";
import ChatContext from "contexts/ChatContext";

export interface MembersListItemProps {
  member: IMember;
  canRemove: boolean;
}

const MembersListItem: React.FC<MembersListItemProps> = ({
  member,
  canRemove,
}) => {
  const { formatMessage } = useIntl();
  const { account } = useEthers();
  const {
    chat: { address },
  } = useContext(ChatContext);
  const chatContract = useConnectedContract(chatAbi, address);
  const { send, state } = useContractFunction("removeMember", chatContract);
  useContractFunctionErrorToast(state);
  useContractFunctionSuccessToast(
    state,
    formatMessage({ id: "members.list.remove.success" })
  );
  const isLoading = state.status === "pending" || state.status === "minting";

  const handleClick = async () => {
    await send(member.account);
  };

  return (
    <ListItem
      key={member.account}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <VCard
        user={member.profile}
        account={member.account}
        isLoaded
        isMe={member.account === account}
        avatarSize="8"
      />

      {canRemove && (
        <Tooltip
          label={<FormattedMessage id="common.remove" />}
          placement="top"
        >
          <IconButton
            aria-label={formatMessage({
              id: "common.remove",
            })}
            icon={TrashIcon}
            isLoading={isLoading}
            isDisabled={state.status === "success"}
            onClick={handleClick}
          />
        </Tooltip>
      )}
    </ListItem>
  );
};

export default MembersListItem;
