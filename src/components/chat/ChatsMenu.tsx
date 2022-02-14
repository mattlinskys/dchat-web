import React, { useContext, useEffect } from "react";
import {
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuItem,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import { FormattedMessage, useIntl } from "react-intl";
import useNavigateHash from "hooks/useNavigateHash";
import { CREATE_CHAT_HASH } from "constants/hashes";
import { useNavigate } from "react-router-dom";
import { getChatPath } from "utils/routesUtils";
import CachedChatsContext from "contexts/CachedChatsContext";
import CloseIcon from "components/icons/CloseIcon";
import IconButton from "components/shared/IconButton";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import PlusIcon from "components/icons/PlusIcon";

const ChatsMenu: React.FC = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const navigateHash = useNavigateHash();
  const {
    chat: { id },
  } = useContext(ChatContext);
  const {
    chatIds: cachedChatIds,
    pushChatId,
    removeChatId,
  } = useContext(CachedChatsContext);

  useEffect(() => {
    pushChatId(id);
  }, [id]);

  return (
    <Menu isLazy placement="bottom">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            variant="unstyled"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            pl="2"
            pr="2"
            h="8"
            display="flex"
            rightIcon={
              <Icon
                as={ChevronDownIcon}
                w="6"
                h="auto"
                ml="-0.5"
                opacity="0.8"
                transform="auto-gpu"
                transition="100ms transform"
                rotate={isOpen ? "180deg" : undefined}
              />
            }
          >
            <FormattedMessage id="chat.title" values={{ id }} />
          </MenuButton>

          <MenuList maxW="20">
            {cachedChatIds.length > 0 && (
              <>
                <Box overflowY="scroll">
                  <MenuOptionGroup
                    title={formatMessage({ id: "chat.menu.title" })}
                    type="radio"
                    value={id}
                    onChange={(id) => navigate(getChatPath(id as string))}
                  >
                    {cachedChatIds.map((chatId) => (
                      <MenuItemOption
                        key={chatId}
                        value={chatId}
                        css={`
                          & > span:last-child {
                            overflow: hidden;
                          }
                        `}
                      >
                        <HStack justify="space-between" spacing="2">
                          <Text as="span" title={chatId} isTruncated>
                            #{chatId}
                          </Text>

                          {id !== chatId && (
                            <IconButton
                              as="div"
                              role="button"
                              aria-label={formatMessage({
                                id: "common.remove-chat",
                              })}
                              icon={CloseIcon}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeChatId(chatId);
                              }}
                            />
                          )}
                        </HStack>
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </Box>
                <MenuDivider />
              </>
            )}

            <MenuItem
              onClick={() => navigateHash(CREATE_CHAT_HASH)}
              icon={<Icon as={PlusIcon} verticalAlign="middle" />}
              color="brand.500"
              fontWeight="bold"
            >
              <FormattedMessage id="chat.menu.create" />
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ChatsMenu;
