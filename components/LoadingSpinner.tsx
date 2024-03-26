import Image from "next/image";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        priority
        width={40}
        height={40}
        alt="Loading Spinner"
        className="animate-spin"
        src="/images/poke-ball.png"
      />
    </div>
  );
};

export default LoadingSpinner;
