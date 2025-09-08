import React from "react";

const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="skeleton"
      className={`bg-accent animate-pulse rounded-md ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
