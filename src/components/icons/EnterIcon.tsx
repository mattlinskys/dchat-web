import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const EnterIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g stroke="currentColor" strokeWidth="2.222" fill="none" fillRule="evenodd">
      <path d="M7.764 17.778 3.32 13.333 7.764 8.89" />
      <path d="M4.007 13.334h13.215V5.093h-4.61" />
    </g>
  </IconBase>
);

export default EnterIcon;
