import React from "react";
import { chakra, Box, BoxProps } from "@chakra-ui/react";
import { sumChars } from "utils/stringUtils";

export interface AvatarProps extends Omit<BoxProps, "rounded" | "bg"> {
  address: string;
  size: BoxProps["w"];
}

const avatarPaths = [
  <path
    d="m22.871 15.216 6.599 4.38a10 10 0 0 0 11.06 0l6.599-4.38A7 7 0 0 1 58 21.048V61H12V21.048a7 7 0 0 1 10.871-5.832Z"
    fill="currentColor"
    fillRule="evenodd"
  />,
  <path
    d="m44.884 13.023 19.767 31.313c3.538 5.605 1.862 13.015-3.742 16.553a12 12 0 0 1-6.405 1.853H14.842c-6.628 0-12-5.373-12-12a12 12 0 0 1 1.871-6.435l19.895-31.314C28.162 7.4 35.578 5.746 41.172 9.3a12 12 0 0 1 3.712 3.723Z"
    fill="currentColor"
    fillRule="evenodd"
  />,
  <circle fill="currentColor" cx="35" cy="35" r="26" fillRule="evenodd" />,
  <path
    d="m44.317 5.406 18.03 13.1a15 15 0 0 1 5.45 16.77L60.91 56.474a15 15 0 0 1-14.266 10.365H24.356A15 15 0 0 1 10.09 56.473L3.203 35.277a15 15 0 0 1 5.45-16.77l18.03-13.101a15 15 0 0 1 17.634 0Z"
    fill="currentColor"
    fillRule="evenodd"
  />,
  <rect
    x="11"
    y="11"
    width="49"
    height="49"
    rx="12"
    fill="currentColor"
    fillRule="evenodd"
  />,
  <path
    d="M9 34.5c0-6.075 4.925-11 11-11h2.21c-4.468-1.4-7.71-5.571-7.71-10.5 0-6.075 4.925-11 11-11h19c6.075 0 11 4.925 11 11 0 4.93-3.243 9.103-7.713 10.5H50c6.075 0 11 4.925 11 11s-4.925 11-11 11h7c6.075 0 11 4.925 11 11s-4.925 11-11 11H13c-6.075 0-11-4.925-11-11s4.925-11 11-11h7c-6.075 0-11-4.925-11-11Z"
    fill="currentColor"
    fillRule="evenodd"
  />,
  <rect
    x="16"
    y="1.5"
    width="38"
    height="68"
    rx="19"
    fill="currentColor"
    fillRule="evenodd"
  />,
  <path
    d="M13.144 19.901 28.358 3.263a9 9 0 0 1 13.284 0l15.214 16.638A12 12 0 0 1 60 28V61c0 6.627-5.373 12-12 12H22c-6.627 0-12-5.373-12-12V28a12 12 0 0 1 3.144-8.099Z"
    fill="currentColor"
    fillRule="evenodd"
  />,
];

const colors = [
  "#FF7171",
  "#71FFD8",
  "#FFD22A",
  "#CD80FF",
  "#D8D8D8",
  "#ABE7FF",
  "#F3AD39",
  "#F2F572",
  "#76DD78",
  "#FE71FF",
  "#87E3FE",
  "#FF80BD",
  "#F66565",
  "#FFF782",
  "#85FFB8",
  "#A2B2F9",
];

const Avatar: React.FC<AvatarProps> = ({ address, size, ...rest }) => {
  const num = sumChars(address);
  const path = avatarPaths[num % avatarPaths.length];
  const color = colors[num % colors.length];

  return (
    <Box
      w={size}
      h={size}
      rounded="full"
      bg="white"
      position="relative"
      overflow="hidden"
      {...rest}
    >
      <Box w="full" h="full" backgroundColor={color} opacity="0.4" />
      <Box position="absolute" inset="0">
        <chakra.svg
          w="full"
          h="full"
          position="absolute"
          color={color}
          viewBox="0 0 70 70"
          xmlns="http://www.w3.org/2000/svg"
        >
          {path}
          <path
            d="M38.312 40a3 3 0 0 1 2.713 4.278C39.858 46.759 37.683 48 34.5 48c-3.183 0-5.358-1.24-6.525-3.722A3 3 0 0 1 30.688 40h7.624ZM27.5 32a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm14 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-14-8a2.5 2.5 0 1 1 0 5h-4a2.5 2.5 0 1 1 0-5h4Zm18 0a2.5 2.5 0 1 1 0 5h-4a2.5 2.5 0 1 1 0-5h4Z"
            fill="#052741"
            fillRule="evenodd"
          />
        </chakra.svg>
      </Box>
    </Box>
  );
};

export default Avatar;
