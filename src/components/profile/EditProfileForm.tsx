import React from "react";
import { FormLabel } from "@chakra-ui/form-control";
import { Formik, Form } from "formik";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";
import SubmitButton from "components/shared/SubmitButton";
import InputField from "components/shared/InputField";
import FormControlField from "components/shared/FormControlField";
import ActionsFooter from "components/shared/ActionsFooter";

interface EditProfileFormValues {
  name: string;
}

export interface EditProfileFormProps {
  defaultValues?: Partial<EditProfileFormValues>;
  onSubmit: (values: EditProfileFormValues) => Promise<void>;
  isLoading?: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading,
}) => (
  <Formik
    initialValues={{
      name: defaultValues?.name ?? "",
    }}
    onSubmit={onSubmit}
    validationSchema={Yup.object().shape({
      name: Yup.string().required("required"),
    })}
  >
    <Form noValidate>
      <FormControlField name="name" isRequired>
        <FormLabel>
          <FormattedMessage id="common.name" />
        </FormLabel>
        <InputField name="name" autoFocus />
      </FormControlField>

      <ActionsFooter>
        <SubmitButton isLoading={isLoading}>
          <FormattedMessage id="common.save" />
        </SubmitButton>
      </ActionsFooter>
    </Form>
  </Formik>
);

export default EditProfileForm;
