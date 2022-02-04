import React, { useCallback, useEffect } from "react";
import { FormLabel } from "@chakra-ui/react";
import ActionsFooter from "components/shared/ActionsFooter";
import FormControlField from "components/shared/FormControlField";
import InputField from "components/shared/InputField";
import SubmitButton from "components/shared/SubmitButton";
import { Formik, Form } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";
import { utils } from "ethers";
import { useContractFunction } from "@usedapp/core";
import useChatContract from "hooks/useChatContract";
import useContractFunctionSuccessToast from "hooks/useContractFunctionSuccessToast";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";

interface AddMemberFormValues {
  address: string;
}

export interface AddMemberFormProps {
  onClose: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onClose }) => {
  const { formatMessage } = useIntl();
  const contract = useChatContract();
  const { send, state } = useContractFunction(contract, "addMember");
  useContractFunctionSuccessToast(
    state,
    formatMessage({ id: "members.add.success" })
  );
  useContractFunctionErrorToast(state);

  const handleSubmit = useCallback(async ({ address }: AddMemberFormValues) => {
    await send(address);
  }, []);

  useEffect(() => {
    if (state.status === "Success") {
      onClose();
    }
  }, [state.status]);

  return (
    <Formik<AddMemberFormValues>
      initialValues={{
        address: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        address: Yup.string()
          .required("required")
          .test("address", "invalid", (value) => utils.isAddress(value!)),
      })}
    >
      <Form noValidate>
        <FormControlField name="address" isRequired>
          <FormLabel>
            <FormattedMessage id="common.address" />
          </FormLabel>
          <InputField name="address" autoFocus />
        </FormControlField>

        <ActionsFooter>
          <SubmitButton
            isLoading={
              state.status === "PendingSignature" ||
              state.status === "Mining" ||
              state.status === "Success"
            }
          >
            <FormattedMessage id="common.save" />
          </SubmitButton>
        </ActionsFooter>
      </Form>
    </Formik>
  );
};

export default AddMemberForm;
