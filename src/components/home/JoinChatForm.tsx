import React, { useState } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getChatPath } from "utils/routesUtils";

const JoinChatForm: React.FC = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  return (
    <HStack w="full" spacing="3">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Provide chat id"
      />
      <Button
        onClick={() => {
          if (value.trim().length > 0) {
            navigate(getChatPath(value));
          }
        }}
      >
        Join
      </Button>
    </HStack>
  );
};

export default JoinChatForm;
