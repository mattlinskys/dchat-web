import React, { useCallback, useState } from "react";
import { Button, Icon, Input, VStack } from "@chakra-ui/react";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";
import PlusIcon from "components/icons/PlusIcon";

export interface AddressInputProps {
  onAddress: (address: string) => void;
  placeholder?: string;
  addLabel: React.ReactNode;
}

const AddressInput: React.FC<AddressInputProps> = ({
  onAddress,
  placeholder,
  addLabel,
}) => {
  const [value, setValue] = useState("");
  const isInvalid = !utils.isAddress(value) || isAddressZero(value);

  const handleNewAddress = useCallback(
    (address: string) => {
      onAddress(utils.getAddress(address));
      setValue("");
    },
    [onAddress]
  );

  return (
    <VStack w="full" spacing="1" align="flex-start">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        isInvalid={!!value && isInvalid}
        onPaste={(e) => {
          const el = e.currentTarget;
          setTimeout(() => {
            if (utils.isAddress(el.value) && !isAddressZero(el.value)) {
              handleNewAddress(el.value);
            }
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            if (!isInvalid) {
              handleNewAddress(value);
            }
          }
        }}
      />

      <Button
        onClick={() => {
          if (!isInvalid) {
            handleNewAddress(value);
          }
        }}
        leftIcon={<Icon as={PlusIcon} />}
        variant="unstyled"
        display="flex"
        alignItems="center"
        h="auto"
        p="1"
        py="0.5"
      >
        {addLabel}
      </Button>
    </VStack>
  );
};

export default AddressInput;
