import React from "react";
import { useContractFunction, useEthers } from "@usedapp/core";
import useChatContract from "hooks/useChatContract";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import useContractFunctionSuccessToast from "hooks/useContractFunctionSuccessToast";
import { ListItem, Tooltip } from "@chakra-ui/react";
import VCard from "components/shared/VCard";
import { FormattedMessage, useIntl } from "react-intl";
import type { IMember } from "types/chat";
import TrashIcon from "components/icons/TrashIcon";
import IconButton from "components/shared/IconButton";

export interface MembersListItemProps {
  member: IMember;
  canRemove: boolean;
}

const MembersListItem: React.FC<MembersListItemProps> = ({
  member,
  canRemove,
}) => {
  const { formatMessage } = useIntl();
  const contract = useChatContract();
  const { account } = useEthers();
  const { send, state } = useContractFunction(contract, "removeMember");
  useContractFunctionErrorToast(state);
  useContractFunctionSuccessToast(
    state,
    formatMessage({ id: "members.list.remove.success" })
  );
  const isLoading =
    state.status === "PendingSignature" || state.status === "Mining";

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
            aria-label="Remove"
            icon={TrashIcon}
            isLoading={isLoading}
            isDisabled={state.status === "Success"}
            onClick={handleClick}
          />
        </Tooltip>
      )}
    </ListItem>
  );
};

export default MembersListItem;
