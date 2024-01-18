import { forwardRef } from "react";
import {
  TextInputProps as MantineTextInputProps,
  TextInput,
} from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

type AuthTextInputProps = MantineTextInputProps &
  ComponentPropsWithoutRef<"input">;

const AuthTextInput = forwardRef<HTMLInputElement, AuthTextInputProps>(
  ({ ...props }, ref) => {
    return (
      <TextInput
        {...props}
        ref={ref}
        data-test-id="auth-text-input"
        classNames={{
          input: "rounded-full py-2 pl-16 pr-8 max-h-auto h-auto",
          section: "ml-5",
        }}
      />
    );
  },
);

export default AuthTextInput;
