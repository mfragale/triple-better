import * as React from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled =
    props.value === "" || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        name="password_fake"
        className={cn("hide-password-toggle pr-10", className)}
        ref={ref}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
        tabIndex={2}
      >
        {showPassword && !disabled ? (
          <EyeIcon className="w-4 h-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
              visibility: hidden;
              pointer-events: none;
              display: none;
          }
      `}</style>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
