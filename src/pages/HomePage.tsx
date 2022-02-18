import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SlideFade,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Logo from "components/assets/Logo";
import Feature from "components/shared/Feature";
import { FormattedMessage } from "react-intl";
import useNavigateHash from "hooks/useNavigateHash";
import { MobileView, isMobile } from "react-device-detect";
import { CREATE_CHAT_HASH, JOIN_CHAT_HASH } from "constants/hashes";
import { Helmet } from "react-helmet";
import InfoAlert from "components/shared/InfoAlert";
import DesktopOnlyIcon from "components/icons/DesktopOnlyIcon";
import { useConnect } from "wagmi";

const HomePage: React.FC = () => {
  const navigateHash = useNavigateHash();
  const [
    {
      data: { connected: isConnected },
    },
  ] = useConnect();
  const isActionDisabled = !isConnected || isMobile;

  return (
    <>
      <Helmet>
        <title>DeChat</title>
      </Helmet>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flexGrow="1"
      >
        <VStack align="center" spacing="2" textAlign="center">
          <Icon as={Logo} w="25vmin" minW="134px" maxW="240px" h="auto" />

          <Heading
            as="h3"
            fontSize="max(var(--chakra-fontSizes-xl), min(5vmin, var(--chakra-fontSizes-5xl)))"
          >
            <FormattedMessage
              id="home.heading"
              values={{
                span: (...chunks: any[]) => (
                  <Text
                    as="span"
                    textDecoration="line-through"
                    textDecorationColor="brand.500"
                  >
                    {chunks}
                  </Text>
                ),
              }}
            />
          </Heading>

          <Heading
            as="h2"
            fontSize="max(var(--chakra-fontSizes-5xl), min(10vmin, var(--chakra-fontSizes-8xl)))"
          >
            <FormattedMessage id="home.title" />
          </Heading>

          <Text
            color="gray.300"
            fontSize="max(var(--chakra-fontSizes-md), min(3vmin, var(--chakra-fontSizes-xl)))"
            maxW="2xl"
          >
            <FormattedMessage id="home.description" />
          </Text>
        </VStack>

        <HStack mt={{ base: "6", md: "10" }} mx="auto">
          <Button
            onClick={() => navigateHash(CREATE_CHAT_HASH)}
            isDisabled={isActionDisabled}
          >
            <FormattedMessage id="home.actions.create-chat" />
          </Button>
          <Button
            onClick={() => navigateHash(JOIN_CHAT_HASH)}
            isDisabled={isActionDisabled}
            variant="outline"
          >
            <FormattedMessage id="home.actions.join-chat" />
          </Button>
        </HStack>

        <MobileView>
          <InfoAlert icon={DesktopOnlyIcon} mx="auto" mt="6" maxW="md">
            <FormattedMessage id="home.mobile.hint" />
          </InfoAlert>

          <Heading
            as="h3"
            mt="8"
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
          >
            <FormattedMessage id="home.features.title" />
          </Heading>
        </MobileView>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "10", md: "20" }}
          py={{ base: "6", md: "20" }}
          mx="auto"
          flexWrap="wrap"
          justify="center"
        >
          {[
            {
              title: <FormattedMessage id="home.features.safe" />,
              icon: (
                <svg
                  width="60"
                  height="64"
                  viewBox="0 0 60 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M52.95 0A7.05 7.05 0 0 1 60 7.05v45.56a7.05 7.05 0 0 1-7.05 7.051H50.18v3.254c0 .6-.485 1.085-1.084 1.085H43.63c-.599 0-1.085-.486-1.085-1.085v-3.254H17.454v3.254c0 .6-.485 1.085-1.084 1.085h-5.467c-.6 0-1.085-.486-1.085-1.085v-3.254H7.051A7.05 7.05 0 0 1 0 52.611V7.05A7.05 7.05 0 0 1 7.05 0h45.9Z"
                      fill="#4E4E4E"
                    />
                    <rect
                      stroke="#2A2A2A"
                      strokeWidth="3.254"
                      fill="#4E4E4E"
                      x="8.182"
                      y="8.136"
                      width="43.636"
                      height="43.39"
                      rx="7.051"
                    />
                    <path
                      d="M38.983 21.936c4.686 4.686 4.708 12.262.048 16.922s-12.237 4.639-16.923-.048c-4.686-4.686-4.708-12.263-.048-16.922 4.66-4.66 12.237-4.639 16.923.048Zm-12.874 6.52-3.158-3.158c-2.063 3.094-2.017 7.185.132 10.258l3.116-3.116a4.838 4.838 0 0 1-.09-3.985Zm9.512 9.511-3.158-3.157a4.838 4.838 0 0 1-3.984-.09l-3.117 3.115c3.074 2.15 7.164 2.195 10.259.132ZM25.173 22.985l3.113 3.113a4.833 4.833 0 0 1 4.326-.072l3.116-3.116c-3.172-2.218-7.43-2.195-10.555.075Zm12.835 2.205-3.116 3.116a4.833 4.833 0 0 1-.072 4.326l3.113 3.113c2.27-3.126 2.293-7.382.075-10.555Z"
                      fill="#FFB74E"
                    />
                  </g>
                </svg>
              ),
            },
            {
              title: <FormattedMessage id="home.features.fees" />,
              icon: (
                <svg
                  width="64"
                  height="74"
                  viewBox="0 0 64 74"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M35.761 2.175 60.246 16.33A7.515 7.515 0 0 1 64 22.836v28.328a7.515 7.515 0 0 1-3.754 6.506L35.761 71.825a7.515 7.515 0 0 1-7.522 0L3.754 57.67A7.515 7.515 0 0 1 0 51.164V22.836a7.515 7.515 0 0 1 3.754-6.506L28.239 2.175a7.515 7.515 0 0 1 7.522 0Z"
                      fill="#4E4E4E"
                    />
                    <g transform="translate(13.212 18.186)" fillRule="nonzero">
                      <ellipse
                        fill="#7B3FE4"
                        cx="18.788"
                        cy="18.814"
                        rx="18.788"
                        ry="18.814"
                      />
                      <path
                        d="M31.314 19.253v5.675a2.052 2.052 0 0 1-1.002 1.75l-4.893 2.833a1.95 1.95 0 0 1-2.004 0l-4.893-2.832a2.04 2.04 0 0 1-1.002-1.75v-1.594l2.505-1.46v2.768L24.41 27.2l4.384-2.557v-5.101l-4.384-2.557-10.27 5.979a2.034 2.034 0 0 1-2.005 0L7.241 20.12a2.041 2.041 0 0 1-.978-1.748v-5.676a2.053 2.053 0 0 1 1.002-1.75l4.892-2.833a1.967 1.967 0 0 1 2.005 0l4.892 2.832a2.04 2.04 0 0 1 1.002 1.75v1.594l-2.52 1.451v-2.753l-4.384-2.557-4.384 2.557v5.096l4.384 2.556 10.27-5.978a2.034 2.034 0 0 1 2.005 0l4.893 2.843a2.041 2.041 0 0 1 .994 1.749Z"
                        fill="#FFF"
                      />
                    </g>
                  </g>
                </svg>
              ),
            },
            {
              title: <FormattedMessage id="home.features.encrypted" />,
              icon: (
                <svg
                  width="110"
                  height="54"
                  viewBox="0 0 110 54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(0 8.498)">
                      <rect
                        fill="#4E4E4E"
                        width="110"
                        height="28.481"
                        rx="2.998"
                      />
                      <text
                        fontFamily="Lato"
                        fontSize="13.491"
                        fontWeight="bold"
                        fill="#A8A1A1"
                      >
                        <tspan x="5.986" y="18.996" fillOpacity=".461">
                          ###
                        </tspan>
                        <tspan x="29.461" y="18.996">
                          {" "}
                          This is{" "}
                        </tspan>
                        <tspan x="73.711" y="18.996" fillOpacity=".5">
                          ####
                        </tspan>
                      </text>
                    </g>
                    <path
                      d="M34.552 6.503c8.735-8.67 22.898-8.67 31.633 0 7.957 7.898 8.666 20.265 2.13 28.96l12.34 10.778a3.915 3.915 0 0 1 .184 5.736l-.877.87a3.985 3.985 0 0 1-5.779-.183L63.267 40.35c-8.731 6.13-20.897 5.316-28.715-2.445-8.736-8.67-8.736-22.73 0-31.4Zm2.402 2.385c-7.408 7.354-7.408 19.277 0 26.632 7.409 7.354 19.42 7.354 26.829 0 7.408-7.355 7.408-19.278 0-26.632-7.409-7.354-19.42-7.354-26.829 0Z"
                      fill="#FFB74E"
                      fillRule="nonzero"
                    />
                  </g>
                </svg>
              ),
            },
          ].map(({ title, icon }, i) => (
            <SlideFade key={i} in delay={0.25}>
              <Feature title={title} icon={icon} />
            </SlideFade>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;
