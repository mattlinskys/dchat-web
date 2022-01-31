import React from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import { FormattedMessage } from "react-intl";

export interface FormControlFieldProps
  extends Omit<FormControlProps, "isInvalid"> {
  name: string;
}

const FormControlField: React.FC<FormControlFieldProps> = ({
  name,
  children,
  ...rest
}) => {
  const [, { error, touched }] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!(error && touched)} {...rest}>
      {children}

      <FormErrorMessage>
        {error && (
          <FormattedMessage id={`validation.name:${error}`} ignoreTag />
        )}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormControlField;
