import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const ChevronDownIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="m3 6 7 8 7-8"
      fill="none"
      fillRule="evenodd"
    />
  </IconBase>
);

export default ChevronDownIcon;
