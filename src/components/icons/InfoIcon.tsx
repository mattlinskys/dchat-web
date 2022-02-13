import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const InfoIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="none" fillRule="evenodd">
      <circle stroke="currentColor" strokeWidth="2" cx="10" cy="10" r="8" />
      <path fill="currentColor" d="M9 9h2v6H9zM9 5h2v2H9z" />
    </g>
  </IconBase>
);

export default InfoIcon;
