import { FC } from "react";
import { ButtonProps as MantineButtonProps, Button } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = MantineButtonProps & ComponentPropsWithoutRef<"button">;

const AuthButton: FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <Button
      data-test-id="auth-button"
      {...rest}
      fullWidth
      className={className}
      classNames={{
        root: "rounded-full h-auto max-h-auto",
        inner: "py-5",
        label: "font-base",
      }}
    />
  );
};

export default AuthButton;
