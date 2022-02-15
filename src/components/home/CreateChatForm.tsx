import React, { useCallback, useMemo, useEffect, useRef } from "react";
import {
  VStack,
  List,
  FormLabel,
  ListItem,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import useContractFunction from "hooks/useContractFunction";
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
import { FormattedMessage, useIntl } from "react-intl";
import InputField from "components/shared/InputField";
import SubmitButton from "components/shared/SubmitButton";
import AddressInput from "components/shared/AddressInput";
import ProfileVCard from "components/shared/ProfileVCard";
import TrashIcon from "components/icons/TrashIcon";
import IconButton from "components/shared/IconButton";
import useConnectedContract from "hooks/useConnectedContract";
import { factoryAbi } from "app/abis";
import useFactoryAddress from "hooks/useFactoryAddress";

interface CreateChatFormValues {
  id: string;
  addresses: string[];
}

const CreateChatForm: React.FC = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { account } = useEthers();
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);
  const { send, state } = useContractFunction("createChat", factoryContract);
  const chatIdRef = useRef<string>();
  useContractFunctionErrorToast(state, (err) =>
    err.endsWith("'id-taken'")
      ? formatMessage({ id: "erros.chat-id.taken" })
      : undefined
  );

  const initialValues = useMemo<CreateChatFormValues>(
    () => ({
      id: nanoid(12),
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
      chatIdRef.current = id;
      await send(utils.id(id), addresses);
    },
    [send, navigate]
  );

  useEffect(() => {
    if (state.status === "success") {
      navigate(getChatPath(chatIdRef.current!), {
        state: { new: true },
      });
    }
  }, [state.status]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form noValidate>
        <VStack spacing="4" w="full" alignItems="start">
          <FormControlField name="id">
            <FormLabel>
              <FormattedMessage id="common.chat-id" />
            </FormLabel>

            <InputField
              name="id"
              placeholder={formatMessage({
                id: "common.chat-id.placeholder",
              })}
            />
          </FormControlField>

          <FormikConsumer>
            {({
              values: { addresses },
            }: FormikContextType<CreateChatFormValues>) => (
              <FieldArray name="addresses">
                {({ push, remove }) => (
                  <Box w="full">
                    <FormLabel>
                      <FormattedMessage id="common.members" /> (
                      {addresses.length})
                    </FormLabel>

                    <List
                      w="full"
                      spacing="2"
                      mb="2"
                      maxH="48"
                      overflowY="auto"
                    >
                      {addresses.map((address, i) => (
                        <ListItem
                          key={address}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <ProfileVCard account={address} avatarSize="8" />

                          {address !== account && (
                            <Tooltip
                              label={<FormattedMessage id="common.remove" />}
                              placement="top"
                            >
                              <IconButton
                                aria-label={formatMessage({
                                  id: "common.remove",
                                })}
                                icon={TrashIcon}
                                onClick={() => remove(i)}
                              />
                            </Tooltip>
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
                      placeholder={formatMessage({
                        id: "chat.create.address.placeholder",
                      })}
                      addLabel={
                        <FormattedMessage id="chat.create.address.add" />
                      }
                    />
                  </Box>
                )}
              </FieldArray>
            )}
          </FormikConsumer>

          <SubmitButton
            isLoading={
              state.status === "pending" ||
              state.status === "minting" ||
              state.status === "success"
            }
            isFullWidth
          >
            <FormattedMessage id="common.create" />
          </SubmitButton>
        </VStack>
      </Form>
    </Formik>
  );
};

export default CreateChatForm;
