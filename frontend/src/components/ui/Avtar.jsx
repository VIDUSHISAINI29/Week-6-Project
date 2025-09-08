import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const Avatar = ({ className = "", ...props }) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={`relative flex size-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
};

const AvatarImage = ({ className = "", ...props }) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={`aspect-square size-full ${className}`}
      {...props}
    />
  );
};

const AvatarFallback = ({ className = "", ...props }) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={`bg-muted flex size-full items-center justify-center rounded-full ${className}`}
      {...props}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };
