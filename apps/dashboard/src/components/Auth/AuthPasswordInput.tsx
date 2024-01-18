import { forwardRef } from "react";
import {
  PasswordInputProps as MantinePasswordInputProps,
  PasswordInput,
} from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

type AuthPasswordInputProps = MantinePasswordInputProps &
  ComponentPropsWithoutRef<"input">;

const AuthPasswordInput = forwardRef<HTMLInputElement, AuthPasswordInputProps>(
  ({ ...props }, ref) => {
    return (
      <PasswordInput
        {...props}
        ref={ref}
        data-test-id="auth-password-input"
        classNames={{
          // toggle button
          wrapper: " [&>*:nth-last-of-type(1)]:mr-6",
          input: "rounded-full py-2 h-[3.25rem]",
          innerInput: "px-16",
          section: "ml-5",
        }}
      />
    );
  },
);

export default AuthPasswordInput;
