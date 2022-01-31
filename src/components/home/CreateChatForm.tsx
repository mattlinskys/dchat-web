import React, { useCallback, useEffect, useMemo } from "react";
import {
  VStack,
  List,
  FormLabel,
  ListItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import useFactoryContract from "hooks/useFactoryContract";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import { useNavigate } from "react-router-dom";
import { getChatPath } from "utils/routesUtils";
import { nanoid } from "nanoid";
import {
  FieldArray,
  Form,
  Formik,
  FormikConsumer,
  FormikContextType,
} from "formik";
import * as Yup from "yup";
import FormControlField from "components/shared/FormControlField";
import { FormattedMessage } from "react-intl";
import InputField from "components/shared/InputField";
import SubmitButton from "components/shared/SubmitButton";
import AddressInput from "components/shared/AddressInput";
import ProfileVCard from "components/shared/ProfileVCard";
import CloseIcon from "components/icons/CloseIcon";

interface CreateChatFormValues {
  id: string;
  addresses: string[];
}

const CreateChatForm: React.FC = () => {
  const { account } = useEthers();
  const navigate = useNavigate();
  const factoryContract = useFactoryContract();
  const { state, send, events } = useContractFunction(
    factoryContract!,
    "createChat"
  );
  useContractFunctionErrorToast(state);

  const initialValues = useMemo<CreateChatFormValues>(
    () => ({
      id: nanoid(14),
      addresses: [account!],
    }),
    []
  );

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("required"),
    addresses: Yup.array()
      .of(
        Yup.string()
          .required("required")
          .test("address", "invalid", (value) => utils.isAddress(value!))
      )
      .required("required"),
  });

  const handleSubmit = useCallback(
    async ({ id, addresses }: CreateChatFormValues) => {
      await send(utils.id(id), addresses);
    },
    [send]
  );

  useEffect(() => {
    const [event] = events ?? [];
    if (state.status === "Success" && event) {
      navigate(getChatPath(utils.parseBytes32String(event.args.id)), {
        state: { new: true },
      });
    }
  }, [state.status, events?.length]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form noValidate>
        <VStack spacing="3" w="full" alignItems="start">
          <FormControlField name="id">
            <FormLabel>
              <FormattedMessage id="common.chatId" ignoreTag />
            </FormLabel>
            <InputField name="id" />
          </FormControlField>

          <FormikConsumer>
            {({
              values: { addresses },
            }: FormikContextType<CreateChatFormValues>) => (
              <FieldArray name="addresses">
                {({ push, remove }) => (
                  <>
                    <FormLabel>
                      <FormattedMessage id="common.members" ignoreTag /> (
                      {addresses.length})
                    </FormLabel>

                    <List w="full" spacing="2" maxH="48" overflowY="auto">
                      {addresses.map((address, i) => (
                        <ListItem
                          key={address}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <ProfileVCard account={address} avatarSize="7" />

                          {address !== account && (
                            <IconButton
                              aria-label="Remove"
                              variant="ghost"
                              opacity={0.8}
                              size="lg"
                              mx="1"
                              minW="6"
                              h="6"
                              icon={<Icon as={CloseIcon} />}
                              onClick={() => remove(i)}
                            />
                          )}
                        </ListItem>
                      ))}
                    </List>

                    <AddressInput
                      onAddress={(address) => {
                        if (!addresses.includes(address)) {
                          push(address);
                        }
                      }}
                      placeholder="Enter member address"
                    />
                  </>
                )}
              </FieldArray>
            )}
          </FormikConsumer>

          <SubmitButton
            isLoading={
              state.status === "Mining" ||
              state.status === "PendingSignature" ||
              state.status === "Success"
            }
            w="full"
          >
            <FormattedMessage id="common.create" />
          </SubmitButton>
        </VStack>
      </Form>
    </Formik>
  );
};

export default CreateChatForm;
