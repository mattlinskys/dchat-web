import React from "react";
import Dialog from "components/shared/Dialog";
import JoinChatForm from "components/home/JoinChatForm";
import { JOIN_CHAT_HASH } from "constants/hashes";
import useHashDisclosure from "hooks/useHashDisclosure";
import { FormattedMessage } from "react-intl";

const JoinChatDialogProvider: React.FC = () => {
  const { isVisible, onClose } = useHashDisclosure(JOIN_CHAT_HASH);

  return (
    <Dialog
      title={<FormattedMessage id="chat.join.title" />}
      isOpen={isVisible}
      onClose={onClose}
    >
      <JoinChatForm />
    </Dialog>
  );
};

export default JoinChatDialogProvider;
