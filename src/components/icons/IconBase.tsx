import React from "react";

export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {}

const IconBase: React.FC<IconBaseProps> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);

export default IconBase;
