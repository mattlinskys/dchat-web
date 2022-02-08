import React, { useCallback, useState } from "react";
import { chakra, Icon, Input, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";

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
    <VStack w="full" spacing="1.5" align="flex-start">
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

      <chakra.button
        type="button"
        color="brand.500"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        onClick={() => {
          if (!isInvalid) {
            handleNewAddress(value);
          }
        }}
      >
        <Icon as={AddIcon} mr="1.5" />
        {addLabel}
      </chakra.button>
    </VStack>
  );
};

export default AddressInput;
