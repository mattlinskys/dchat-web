import React, { useContext } from "react";
import ChatContext from "contexts/ChatContext";
import { Helmet } from "react-helmet";

const ChatMetaTitle: React.FC = () => {
  const {
    chat: { id },
  } = useContext(ChatContext);

  // TODO: Show number of new messages if window is unactive
  return (
    <Helmet>
      <title>DChat - #{id}</title>
    </Helmet>
  );
};

export default ChatMetaTitle;
