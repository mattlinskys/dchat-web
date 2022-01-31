import React from "react";
import { useField } from "formik";
import { Input, InputProps } from "@chakra-ui/react";

export interface InputFieldProps extends InputProps {
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, ...rest }) => {
  const [field] = useField(name);

  return <Input {...field} {...rest} />;
};

export default InputField;
