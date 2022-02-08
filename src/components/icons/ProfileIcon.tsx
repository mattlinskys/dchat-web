import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const ProfileIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M10 10.472c3.314 0 6 2.67 6 5.961V18.5H4v-2.067c0-3.292 2.686-5.96 6-5.96Zm.111-8.972c2.025 0 3.667 1.631 3.667 3.643 0 2.012-1.642 3.643-3.667 3.643S6.444 7.155 6.444 5.143c0-2.012 1.642-3.643 3.667-3.643Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </IconBase>
);

export default ProfileIcon;
