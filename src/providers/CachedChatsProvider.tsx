import React, { useCallback, useMemo, useState } from "react";
import CachedChatsContext from "contexts/CachedChatsContext";
import { CACHED_CHAT_IDS_TOKEN } from "constants/tokens";

const MAX_CHAT_IDS_COUNT = 100;

const CachedChatsProvider: React.FC = ({ children }) => {
  const [chatIds, setChatIds] = useState<string[]>(() => {
    try {
      const savedChatIdsRaw = localStorage.getItem(CACHED_CHAT_IDS_TOKEN);
      if (savedChatIdsRaw) {
        const savedChatIds = (JSON.parse(savedChatIdsRaw) as string[]).filter(
          (id) => !!id
        );
        return savedChatIds;
      }
    } catch {}

    return [];
  });

  const updateChatIds = useCallback((newChatIds: string[]) => {
    const slicedChatIds = newChatIds.slice(0, MAX_CHAT_IDS_COUNT);
    setChatIds(slicedChatIds);
    localStorage.setItem(CACHED_CHAT_IDS_TOKEN, JSON.stringify(slicedChatIds));
  }, []);

  const pushChatId = useCallback(
    (id: string) => {
      updateChatIds([id, ...chatIds.filter((chatId) => chatId !== id)]);
    },
    [chatIds]
  );

  const removeChatId = useCallback(
    (id: string) => {
      updateChatIds(chatIds.filter((chatId) => chatId !== id));
    },
    [chatIds]
  );

  const value = useMemo(
    () => ({ chatIds, pushChatId, removeChatId }),
    [chatIds, pushChatId, removeChatId]
  );

  return (
    <CachedChatsContext.Provider value={value}>
      {children}
    </CachedChatsContext.Provider>
  );
};

export default CachedChatsProvider;
