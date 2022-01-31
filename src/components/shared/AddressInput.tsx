import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";

export interface AddressInputProps {
  onAddress: (address: string) => void;
  placeholder?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  onAddress,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  const isInvalid = !utils.isAddress(value) || isAddressZero(value);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      isInvalid={!!value && isInvalid}
      onPaste={(e) => {
        const el = e.currentTarget;
        setTimeout(() => {
          if (!utils.isAddress(el.value) && !isAddressZero(el.value)) {
            onAddress(el.value);
            setValue("");
          }
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          if (isInvalid) {
            onAddress(value);
            setValue("");
          }
        }
      }}
    />
  );
};

export default AddressInput;
