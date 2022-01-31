import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const CloseIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M16.364 3.636a1 1 0 010 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.951-4.95-4.949A1 1 0 015.05 3.636L10 8.584l4.95-4.948a1 1 0 011.414 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </IconBase>
);

export default CloseIcon;
