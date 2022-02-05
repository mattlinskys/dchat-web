import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const ExpandUpIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase width="26" height="10" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="M24 7 13 3 2 7"
      fill="none"
      fillRule="evenodd"
    />
  </IconBase>
);

export default ExpandUpIcon;
