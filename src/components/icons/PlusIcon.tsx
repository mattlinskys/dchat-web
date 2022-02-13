import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const PlusIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M0 10c0 .69.56 1.25 1.25 1.25h7.292c.115 0 .208.093.208.208v7.292a1.25 1.25 0 0 0 2.5 0v-7.292c0-.115.093-.208.208-.208h7.292a1.25 1.25 0 0 0 0-2.5h-7.292a.208.208 0 0 1-.208-.208V1.25a1.25 1.25 0 0 0-2.5 0v7.292a.208.208 0 0 1-.208.208H1.25C.56 8.75 0 9.31 0 10Z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </IconBase>
);

export default PlusIcon;
