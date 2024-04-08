// ** Next Imports
import Image from "next/image";
import React from "react";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { className } = props;

  return (
    <div className="flex items-center justify-center">
      <Image
        priority
        width={40}
        height={40}
        alt="Loading Spinner"
        src="/images/poke-ball.png"
        className={`animate-spin ${className}`}
      />
    </div>
  );
};

export default LoadingSpinner;
