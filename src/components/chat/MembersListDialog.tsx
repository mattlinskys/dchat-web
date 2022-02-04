import React, { useContext } from "react";
import ChatContext from "contexts/ChatContext";
import { FormattedMessage } from "react-intl";
import { Icon, IconButton, List, ListItem, Tooltip } from "@chakra-ui/react";
import VCard from "components/shared/VCard";
import { useEthers } from "@usedapp/core";
import { CloseIcon } from "@chakra-ui/icons";
import Dialog, { DialogProps } from "components/shared/Dialog";

interface MembersListDialogProps extends Omit<DialogProps, "title"> {}

const MembersListDialog: React.FC<MembersListDialogProps> = (props) => {
  const {
    chat: { ownerAccount },
    members,
  } = useContext(ChatContext);
  const { account } = useEthers();
  const isUserChatOwner = ownerAccount === account;

  return (
    <Dialog
      title={
        <FormattedMessage
          id="members.list.title"
          values={{ count: members.length }}
          ignoreTag
        />
      }
      {...props}
    >
      <List w="full" spacing="2" maxH="96" overflowY="auto">
        {members.map((member) => (
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

            {isUserChatOwner && member.account !== account && (
              <Tooltip
                label={<FormattedMessage id="common.remove" ignoreTag />}
                placement="top"
              >
                <IconButton
                  aria-label="Remove"
                  variant="ghost"
                  color="gray.200"
                  size="sm"
                  mx="1"
                  minW="6"
                  h="6"
                  icon={<Icon as={CloseIcon} />}
                  onClick={() => {}}
                />
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default MembersListDialog;
