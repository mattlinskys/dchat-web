import React from "react";
import { IntlProvider } from "react-intl";
import messagesEn from "lang/en.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "app/theme";
import { CHAT_PATH, HOME_PATH } from "constants/routes";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiProvider, InjectedConnector, Connector } from "wagmi";
import Layout from "components/base/Layout";
import { SUPPORTED_CHAINS } from "constants/chains";
import { providers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";

import ProfileProvider from "providers/ProfileProvider";
import SetupProfileDialogProvider from "providers/SetupProfileDialogProvider";
import ProfileDialogProvider from "providers/ProfileDialogProvider";
import JoinChatDialogProvider from "providers/JoinChatDialogProvider";
import CreateChatDialogProvider from "providers/CreateChatDialogProvider";
import UnsupportedChainDialogProvider from "providers/UnsupportedChainDialogProvider";

import HomePage from "pages/HomePage";
import ChatPage from "pages/ChatPage";

const connectors = () => [
  new InjectedConnector({
    chains: SUPPORTED_CHAINS,
  }),
];

const provider = ({ connector }: { connector?: Connector }) =>
  connector instanceof InjectedConnector
    ? new providers.Web3Provider(connector.getProvider()! as ExternalProvider)
    : providers.getDefaultProvider();

const App: React.FC = () => (
  <IntlProvider locale="en" messages={messagesEn}>
    <BrowserRouter>
      <WagmiProvider autoConnect connectors={connectors} provider={provider}>
        <ChakraProvider theme={theme}>
          <ProfileProvider>
            <Layout>
              <Routes>
                <Route path={HOME_PATH} element={<HomePage />} />
                <Route path={CHAT_PATH} element={<ChatPage />} />
              </Routes>
            </Layout>

            <SetupProfileDialogProvider />
            <ProfileDialogProvider />
            <JoinChatDialogProvider />
            <CreateChatDialogProvider />
            <UnsupportedChainDialogProvider />
          </ProfileProvider>
        </ChakraProvider>
      </WagmiProvider>
    </BrowserRouter>
  </IntlProvider>
);

export default App;
