import React from "react";
import { VStack, Center, Text } from "@chakra-ui/react";

export interface FeatureProps {
  icon: React.ReactNode;
  title: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ icon, title }) => (
  <VStack spacing="4" align="center" maxW="40" textAlign="center">
    <Center h="20">{icon}</Center>
    <Text fontSize="lg" fontWeight="bold">
      {title}
    </Text>
  </VStack>
);

export default Feature;
