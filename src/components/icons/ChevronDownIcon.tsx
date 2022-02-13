import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const ChevronDownIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M13.825 7 10 10.709 6.175 7 5 8.142 10 13l5-4.858z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </IconBase>
);

export default ChevronDownIcon;
