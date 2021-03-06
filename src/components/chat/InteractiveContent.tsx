import React, { useMemo } from "react";
import { Link, Text } from "@chakra-ui/react";
import useActiveChain from "hooks/useActiveChain";
import { shortenAddress } from "utils/addressUtils";

export interface InteractiveContentProps {
  content: string;
}

const InteractiveContent: React.FC<InteractiveContentProps> = ({ content }) => {
  const activeChain = useActiveChain();
  const children = useMemo(() => {
    const regex =
      /(?<link>(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])|(?:@(?<name>[A-Z0-9-_]+))|(?<address>0x[0-9A-F]{40})/gi;
    let match = regex.exec(content);

    if (!match) {
      return [content];
    }

    const parts = [];
    let lastIndex = 0;
    while (match) {
      parts.push(content.slice(lastIndex, match.index));
      lastIndex = match.index;
      const { link, name, address } = match.groups || {};

      if (link) {
        try {
          const url = new URL(link);
          const key = `${lastIndex}_${url.href}`;

          parts.push(
            <Link key={key} href={url.href} isExternal>
              {url.href}
            </Link>
          );
        } catch {
          parts.push(match[0]);
        }
      } else if (address) {
        parts.push(
          <Link
            key={`${lastIndex}_${address}`}
            href={
              activeChain && activeChain.blockExplorers?.[0]
                ? `${activeChain.blockExplorers[0].url}address/${address}`
                : "#"
            }
            title={address}
            fontWeight="medium"
            isExternal
          >
            {shortenAddress(address)}
          </Link>
        );
      } else if (name) {
        parts.push(
          <>
            <Text as="span" fontWeight="medium">
              <Text as="span" opacity="0.8">
                @
              </Text>
              {name}
            </Text>
          </>
        );
      }

      lastIndex += match[0].length;
      match = regex.exec(content);
    }

    parts.push(content.slice(lastIndex));
    return parts;
  }, [content, activeChain?.blockExplorers]);

  return <>{children}</>;
};

export default InteractiveContent;
