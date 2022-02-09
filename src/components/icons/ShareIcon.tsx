import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

export const ShareIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="currentColor" fillRule="nonzero">
      <path d="M17.999 1a1 1 0 01.993.883l.007.117v5.964a1 1 0 01-1.994.116L17 7.964l-.001-3.55-6.93 6.932a1 1 0 01-1.498-1.32l.083-.094 6.931-6.933L12.035 3a1 1 0 01-.993-.883L11.035 2a1 1 0 01.883-.993L12.035 1H18z" />
      <path
        d="M9 4a1 1 0 01-1 1H4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4a1 1 0 012 0v5a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2h5a1 1 0 011 1z"
        fillOpacity=".5"
      />
    </g>
  </IconBase>
);
