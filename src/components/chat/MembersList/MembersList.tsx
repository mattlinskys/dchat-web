import React, { useContext } from "react";
import MembersContext from "contexts/MembersContext";
import { List } from "@chakra-ui/react";
import MembersListItem from "components/chat/MembersList/MembersListItem";
import useUserChatOwner from "hooks/useUserChatOwner";
import useAccountAddress from "hooks/useAccountAddress";

const MembersList: React.FC = () => {
  const { members } = useContext(MembersContext);
  const account = useAccountAddress();
  const isUserChatOwner = useUserChatOwner();

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
