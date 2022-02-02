import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const AddMemberIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M5.909091 9.3888889c2.711216 0 4.9090908 2.1978749 4.9090908 4.9090909v3.5227164H1v-3.5227164c0-2.711216 2.1978749-4.909091 4.909091-4.909091ZM6 2c1.6568543 0 3 1.3431458 3 3 0 1.6568543-1.3431457 3-3 3S3 6.6568543 3 5c0-1.6568542 1.3431457-3 3-3Z"
        fill="currentColor"
      />
      <path
        d="m15.4998333 5.5-.001 3H18.5v1h-3.0011667l.001 3h-.9999999l-.001-3H11.5v-1h2.9988334l.001-3h.9999999Z"
        stroke="currentColor"
        fill="currentColor"
      />
    </g>
  </IconBase>
);

export default AddMemberIcon;
