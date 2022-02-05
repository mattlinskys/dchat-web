import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const TrashIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M16 7v11H4V7h12ZM9 9H7v7h2V9Zm4 0h-2v7h2V9Zm-1-7v2h6v2H2V4h6V2h4Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </IconBase>
);

export default TrashIcon;
