import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const WalletIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M14 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 6h15v12H1V2h17v2H3v2Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </IconBase>
);

export default WalletIcon;
