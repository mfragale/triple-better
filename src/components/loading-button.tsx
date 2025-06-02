import { ComponentPropsWithRef } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoadingButton({
  pending,
  children,
  onClick,
  className,
  ...props
}: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & {
  pending?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      {...props}
      className={cn("", className)}
      onClick={onClick}
      type="submit"
      disabled={pending || props.disabled}
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
