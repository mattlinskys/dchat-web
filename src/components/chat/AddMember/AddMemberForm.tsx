import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { FormLabel } from "@chakra-ui/react";
import ActionsFooter from "components/shared/ActionsFooter";
import FormControlField from "components/shared/FormControlField";
import InputField from "components/shared/InputField";
import SubmitButton from "components/shared/SubmitButton";
import { Formik, Form } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";
import { utils } from "ethers";
import useSignedContract from "hooks/useSignedContract";
import useContractFunction from "hooks/useContractFunction";
import useContractFunctionSuccessSnackbar from "hooks/useContractFunctionSuccessSnackbar";
import useContractFunctionErrorSnackbar from "hooks/useContractFunctionErrorSnackbar";
import MembersContext from "contexts/MembersContext";
import ChatContext from "contexts/ChatContext";
import { chatAbi } from "app/abis";

interface AddMemberFormValues {
  address: string;
}

export interface AddMemberFormProps {
  onClose: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onClose }) => {
  const { formatMessage } = useIntl();
  const { members } = useContext(MembersContext);
  const {
    chat: { address },
  } = useContext(ChatContext);
  const chatContract = useSignedContract(chatAbi, address);
  const { send, state } = useContractFunction("addMember", chatContract);
  useContractFunctionSuccessSnackbar(
    state,
    formatMessage({ id: "members.add.success" })
  );
  useContractFunctionErrorSnackbar(state);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        address: Yup.string()
          .required("required")
          .test("address", "invalid", (value) => utils.isAddress(value!))
          .test(
            "already-member",
            "already-member",
            (value) =>
              !members.some(
                (member) =>
                  utils.isAddress(value!) &&
                  member.account === utils.getAddress(value!)
              )
          ),
      }),
    [members]
  );

  const handleSubmit = useCallback(
    async ({ address }: AddMemberFormValues) => {
      await send(address);
    },
    [send]
  );

  useEffect(() => {
    if (state.status === "success") {
      onClose();
    }
  }, [state.status]);

  return (
    <Formik<AddMemberFormValues>
      initialValues={{
        address: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form noValidate>
        <FormControlField name="address" isRequired>
          <FormLabel>
            <FormattedMessage id="common.address" />
          </FormLabel>
          <InputField
            name="address"
            placeholder={formatMessage({ id: "common.address.placeholder" })}
            autoFocus
          />
        </FormControlField>

        <ActionsFooter>
          <SubmitButton
            isLoading={
              state.status === "pending" ||
              state.status === "minting" ||
              state.status === "success"
            }
          >
            <FormattedMessage id="common.add" />
          </SubmitButton>
        </ActionsFooter>
      </Form>
    </Formik>
  );
};

export default AddMemberForm;
