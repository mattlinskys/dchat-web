import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const ClosedLockIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M16 9v8H4V9h12Zm-6 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path
        d="M10 3c2.151 0 3.905 1.715 3.996 3.865L14 7.04V13h-2v-1.617h.4V7.04c0-1.291-1-2.346-2.259-2.42L10 4.616a2.41 2.41 0 0 0-2.396 2.281L7.6 7.04 7.599 11H6V7.04C6 4.809 7.79 3 10 3Z"
        fillRule="nonzero"
      />
    </g>
  </IconBase>
);

export default ClosedLockIcon;
