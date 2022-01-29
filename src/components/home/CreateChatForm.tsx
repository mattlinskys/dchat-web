import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import useFactoryContract from "hooks/useFactoryContract";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import { useNavigate } from "react-router-dom";
import { getChatPath } from "utils/routesUtils";
import { nanoid } from "nanoid";

const CreateChatForm: React.FC = () => {
  const { account } = useEthers();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([account!]);
  const [value, setValue] = useState("");
  const id = useMemo(() => nanoid(), []);
  const isInvalid = !!value && !utils.isAddress(value);
  const factoryContract = useFactoryContract();
  const { state, send, events } = useContractFunction(
    factoryContract!,
    "createChat"
  );
  useContractFunctionErrorToast(state);

  const handleAdd = (value: string) => {
    if (!addresses.includes(value)) {
      setAddresses([...addresses, value]);
    }
    setValue("");
  };

  const handleSubmit = () => {
    send(utils.id(id), addresses);
  };

  useEffect(() => {
    if (state.status === "Success") {
      navigate(getChatPath(id), { state: { new: true } });
    }
  }, [state.status, events?.length]);

  return (
    <VStack spacing="2" w="full" alignItems="start">
      <UnorderedList>
        {addresses.map((address) => (
          <Text key={address} as="li" fontSize="xs">
            {address} {address === account && <i>(you)</i>}
          </Text>
        ))}
      </UnorderedList>

      <InputGroup>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter member address"
          isInvalid={isInvalid}
          onPaste={(e) => {
            const el = e.currentTarget;
            setTimeout(() => {
              if (utils.isAddress(el.value)) {
                handleAdd(el.value);
              }
            });
          }}
        />

        <InputRightElement w="4.5" mr="2">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              if (isInvalid || !value.trim()) {
                return;
              }

              handleAdd(value);
            }}
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        isLoading={
          state.status === "Mining" ||
          state.status === "PendingSignature" ||
          state.status === "Success"
        }
        onClick={handleSubmit}
        w="full"
      >
        Create
      </Button>
    </VStack>
  );
};

export default CreateChatForm;
