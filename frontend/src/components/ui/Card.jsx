import * as React from "react";

const Card = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card"
      className={`bg-white text-card-foreground flex flex-col gap-6 rounded-xl border ${className}`}
      {...props}
    />
  );
};

const CardContent = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card-content"
      className={"px-6 [&:last-child]:pb-6 " + className}
      {...props}
    />
  );
};



export {Card, CardContent};
