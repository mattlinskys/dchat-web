import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const UserInfoIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M17 11v2h-2v-2h2Zm0-7v6h-2V4h2ZM6.91 10.389a4.91 4.91 0 0 1 4.908 4.909V17H2v-1.702a4.91 4.91 0 0 1 4.91-4.91ZM7 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
    </g>
  </IconBase>
);

export default UserInfoIcon;
