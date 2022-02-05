import React from "react";

export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

const IconBase: React.FC<IconBaseProps> = ({
  width = "20",
  height = "20",
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  />
);

export default IconBase;
