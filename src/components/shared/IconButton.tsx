import React, { forwardRef } from "react";
import {
  chakra,
  Icon,
  HTMLChakraProps,
  useMultiStyleConfig,
  Spinner,
} from "@chakra-ui/react";

export interface IconButtonProps extends HTMLChakraProps<"button"> {
  icon: React.ComponentType;
  size?: "xs" | "sm" | "md" | "lg";
  "aria-label": string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, size = "sm", type = "button", isDisabled, isLoading, ...rest },
    ref
  ) => {
    const styles = useMultiStyleConfig("IconButton", { size });

    return (
      <chakra.button
        __css={{ ...styles.button }}
        ref={ref}
        type={type}
        disabled={isDisabled || isLoading}
        {...rest}
      >
        {isLoading ? (
          <Spinner w="full" h="full" opacity={0.8} />
        ) : (
          <Icon as={icon} __css={{ ...styles.icon }} />
        )}
      </chakra.button>
    );
  }
);

export default IconButton;
