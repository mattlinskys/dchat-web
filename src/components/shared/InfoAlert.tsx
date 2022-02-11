import React from "react";
import { HStack, StackProps, Icon, Text } from "@chakra-ui/react";

export interface InfoAlertProps extends StackProps {
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
}

const InfoAlert: React.FC<InfoAlertProps> = ({ icon, children, ...rest }) => (
  <HStack
    rounded="md"
    border="1px"
    borderStyle="solid"
    borderColor="brand.500"
    px="3"
    py="2.5"
    spacing="2.5"
    {...rest}
  >
    <Icon as={icon} flexShrink="0" color="brand.500" w="1.25rem" h="auto" />
    <Text color="white" fontSize="sm">
      {children}
    </Text>
  </HStack>
);

export default InfoAlert;
