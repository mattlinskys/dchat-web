import React, { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getChatPath } from "utils/routesUtils";
import { FormattedMessage, useIntl } from "react-intl";

const JoinChatForm: React.FC = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const isDisabled = value.trim().length === 0;

  const handleSubmit = useCallback(() => {
    navigate(getChatPath(value), { replace: true });
  }, [value]);

  return (
    <VStack w="full" spacing="3">
      <FormControl>
        <FormLabel>
          <FormattedMessage id="common.chat-id" />
        </FormLabel>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisabled) {
              handleSubmit();
            }
          }}
          placeholder={formatMessage({ id: "common.chat-id.placeholder" })}
          autoFocus
        />
      </FormControl>
      <Button onClick={handleSubmit} isDisabled={isDisabled} isFullWidth>
        <FormattedMessage id="common.join" />
      </Button>
    </VStack>
  );
};

export default JoinChatForm;
