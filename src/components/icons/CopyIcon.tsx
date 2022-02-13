import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const CopyIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M14.167.833h-10C3.25.833 2.5 1.583 2.5 2.5v11.667h1.667V2.5h10V.833Zm2.5 3.334H7.5c-.917 0-1.667.75-1.667 1.666V17.5c0 .917.75 1.667 1.667 1.667h9.167c.916 0 1.666-.75 1.666-1.667V5.833c0-.916-.75-1.666-1.666-1.666Zm0 13.333H7.5V5.833h9.167V17.5Z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </IconBase>
);

export default CopyIcon;
