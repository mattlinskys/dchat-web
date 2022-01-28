import React, { useMemo } from "react";

export interface InteractiveContentProps {
  content: string;
}

const InteractiveContent: React.FC<InteractiveContentProps> = ({ content }) => {
  const children = useMemo(() => {
    const regex =
      /(?<link>(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])|(?:@(?<name>[A-Z0-9-_]+))|(?::(?<iconKey>[a-z-]+):)|(?<address>0x[0-9A-F]{40})/gi;
    let match = regex.exec(content);

    if (!match) {
      return [content];
    }

    const parts = [];
    let lastIndex = 0;
    while (match) {
      parts.push(content.slice(lastIndex, match.index));
      lastIndex = match.index;
      const { link, name, iconKey, address } = match.groups || {};

      if (link) {
        try {
          const url = new URL(link);
          const key = `${lastIndex}_${url.href}`;

          parts.push(
            <a
              key={key}
              href={url.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {url.href}
            </a>
          );
        } catch {
          parts.push(match[0]);
        }
      } else if (address) {
        parts.push(
          <a
            key={`${lastIndex}_${address}`}
            // TODO: Url based on current chain
            href={`https://polygonscan.com/address/${address}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {address}
          </a>
        );
      }

      // TODO: icon/name parts

      lastIndex += match[0].length;
      match = regex.exec(content);
    }

    parts.push(content.slice(lastIndex));
    return parts;
  }, [content]);

  return <>{children}</>;
};

export default InteractiveContent;
