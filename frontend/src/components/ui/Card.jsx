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


const CardHeader = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card-header"
      className={
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 " +
        className
      }
      {...props}
    />
  );
};




export {Card, CardContent, CardHeader};
