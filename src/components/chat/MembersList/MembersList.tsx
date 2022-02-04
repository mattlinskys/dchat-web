import React, { useContext } from "react";
import ChatContext from "contexts/ChatContext";
import { List } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import MembersListItem from "components/chat/MembersList/MembersListItem";

const MembersList: React.FC = () => {
  const {
    chat: { ownerAccount },
    members,
  } = useContext(ChatContext);
  const { account } = useEthers();
  const isUserChatOwner = ownerAccount === account;

  return (
    <List w="full" spacing="2" maxH="96" overflowY="auto">
      {members.map((member) => (
        <MembersListItem
          key={member.account}
          member={member}
          canRemove={isUserChatOwner && member.account !== account}
        />
      ))}
    </List>
  );
};

export default MembersList;
