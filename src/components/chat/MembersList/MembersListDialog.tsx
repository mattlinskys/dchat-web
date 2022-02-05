import React, { useContext } from "react";
import MembersContext from "contexts/MembersContext";
import { FormattedMessage } from "react-intl";
import Dialog, { DialogProps } from "components/shared/Dialog";
import MembersList from "components/chat/MembersList/MembersList";
import ActionsFooter from "components/shared/ActionsFooter";
import { Button } from "@chakra-ui/react";

interface MembersListDialogProps extends Omit<DialogProps, "title"> {
  onAddMemberOpen: () => void;
}

const MembersListDialog: React.FC<MembersListDialogProps> = ({
  onAddMemberOpen,
  ...props
}) => {
  const { members } = useContext(MembersContext);

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
      <MembersList />

      <ActionsFooter>
        <Button onClick={() => onAddMemberOpen()} size="sm">
          <FormattedMessage id="members.add.title" ignoreTag />
        </Button>
      </ActionsFooter>
    </Dialog>
  );
};

export default MembersListDialog;
