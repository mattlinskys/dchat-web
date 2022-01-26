import React, { useEffect } from "react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Box, VStack, useToast } from "@chakra-ui/react";
// import { encrypt } from "utils/cryptoUtils";
// import { utils } from "ethers";
import JoinChatForm from "components/home/JoinChatForm";
import CreateChatForm from "components/home/CreateChatForm";
import VCard from "components/shared/VCard";

const HomePage: React.FC = () => {
  const { activateBrowserWallet, account, connector, active } = useEthers();
  const balance = useEtherBalance(account);
  const toast = useToast();

  // useEffect(() => {
  //   if (active && connector) {
  //     (async () => {
  //       try {
  //         const provider = await connector.getProvider();
  //         const publicKey = await provider.request({
  //           method: "eth_getEncryptionPublicKey",
  //           params: [account],
  //         });

  //         const msg = "test msg";
  //         const cipher = encrypt(publicKey, msg);

  //         await new Promise((res) => setTimeout(res, 2000));
  //         const decrypted = await provider.request({
  //           method: "eth_decrypt",
  //           params: [JSON.stringify(cipher), account],
  //         });

  //         const data = utils.toUtf8Bytes(
  //           cipher.nonce + cipher.ephemPublicKey + cipher.ciphertext
  //         );
  //       } catch (err: any) {
  //         // err.code === 4001
  //         toast({
  //           title: err.message,
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     })();
  //   }
  // }, [active]);

  return (
    <>
      {active ? (
        <Box p="4">
          <p>Address: {account}</p>
          {balance && <p>Balance: {balance?.toString()}</p>}

          <VStack mt="4" w="sm" spacing="8">
            <JoinChatForm />
            <CreateChatForm />
          </VStack>
        </Box>
      ) : (
        <button
          type="button"
          onClick={() => {
            activateBrowserWallet();
          }}
        >
          Connect wallet
        </button>
      )}
    </>
  );
};

export default HomePage;
