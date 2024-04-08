// ** React Imports
import React from "react";

interface LongArrowRightProps {
  className?: string;
  flipIcon?: boolean;
  width?: number | string;
  height?: number | string;
}

const LongArrowRight = ({
  flipIcon,
  className,
  width = 24,
  height = 24,
}: LongArrowRightProps) => {
  return (
    <svg
      version="1.1"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      className={
        flipIcon
          ? `${className} rotate-180 transform`
          : `${className} rotate-0 transform`
      }
      xmlns="http://www.w3.org/2000/svg"
      enablebackground-="new 0 0 256 256"
    >
      <metadata>
        Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
      </metadata>
      <g>
        <g>
          <path d="M10,123.8h219.1v8.4H10V123.8z" />
          <path d="M203.9,115.4L246,128l-42.1,12.6V115.4z" />
        </g>
      </g>
    </svg>
  );
};

export default LongArrowRight;
