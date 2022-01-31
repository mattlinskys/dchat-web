import React from "react";
import { useFormikContext } from "formik";
import { Button, ButtonProps } from "@chakra-ui/react";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, ...rest }) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button type="submit" isLoading={isSubmitting || isLoading} {...rest} />
  );
};

export default SubmitButton;
