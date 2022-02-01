import React, { useRef, useLayoutEffect, useState } from "react";
import { chakra, Text, TextProps } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

export interface ShowMoreTextProps extends TextProps {}

const ShowMoreText: React.FC<ShowMoreTextProps> = ({ noOfLines, ...rest }) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowed, setOverflowed] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const text = textRef.current;
    if (text && !isExpanded) {
      setOverflowed(text.offsetHeight < text.scrollHeight);
    }
  });

  return (
    <>
      <Text
        noOfLines={isExpanded ? undefined : noOfLines}
        ref={textRef}
        {...rest}
      />
      {!isExpanded && isOverflowed && (
        <chakra.button
          onClick={() => setExpanded(true)}
          color="brand.500"
          fontWeight="semibold"
          fontSize="sm"
          lineHeight="5"
          display="block"
        >
          <FormattedMessage id="common.showMore" ignoreTag />
        </chakra.button>
      )}
    </>
  );
};

export default ShowMoreText;
