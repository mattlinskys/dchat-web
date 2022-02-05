import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const EmojiIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="none" fillRule="evenodd">
      <circle stroke="currentColor" strokeWidth="2" cx="10" cy="10" r="8" />
      <path fill="currentColor" d="M7 7h2v3H7zM11 7h2v3h-2z" />
      <path
        d="M5.197 11.201C6.399 12.77 8 13.552 10 13.552s3.668-.783 5.005-2.35"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  </IconBase>
);

export default EmojiIcon;
