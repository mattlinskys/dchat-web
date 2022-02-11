import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const DesktopOnlyIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="none" fillRule="evenodd">
      <path stroke="currentColor" strokeWidth="2" d="M2 2h16v13H2z" />
      <path
        fill="currentColor"
        d="M8 15h4v2H8zM5 17h10v2H5zM9 11h2v2H9zM9 4h2v6H9z"
      />
    </g>
  </IconBase>
);

export default DesktopOnlyIcon;
