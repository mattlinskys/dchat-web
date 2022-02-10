import React, { useContext, useEffect, useMemo, useState } from "react";
import ChatContext from "contexts/ChatContext";
import { Helmet } from "react-helmet";
import useWindowActive from "hooks/useWindowActive";
import MessagesContext from "contexts/MessagesContext";
import { useIntl } from "react-intl";

const ChatMetaTitle: React.FC = () => {
  const { formatMessage } = useIntl();
  const {
    chat: { id },
  } = useContext(ChatContext);
  const { chatEntries } = useContext(MessagesContext);
  const isActive = useWindowActive();
  const [date, setDate] = useState<Date | null>(null);
  const unreadMsgCount = useMemo(
    () => date && chatEntries.filter((entry) => entry.createdAt > date).length,
    [chatEntries, date]
  );
  const [showMsgsInfo, setShowMsgsInfo] = useState(false);

  useEffect(() => {
    setDate(isActive ? null : new Date());
  }, [isActive]);

  useEffect(() => {
    if (!unreadMsgCount) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowMsgsInfo(!showMsgsInfo);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [!!unreadMsgCount, showMsgsInfo]);

  return (
    <Helmet>
      <title>
        {unreadMsgCount && showMsgsInfo
          ? formatMessage(
              { id: "chat.title.new-msgs" },
              { count: unreadMsgCount }
            )
          : `DeChat - #${id}`}
      </title>
    </Helmet>
  );
};

export default ChatMetaTitle;
