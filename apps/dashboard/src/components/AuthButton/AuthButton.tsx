import { FC } from "react";
import { ButtonProps as MantineButtonProps, Button } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = MantineButtonProps & ComponentPropsWithoutRef<"button">;

const AuthButton: FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <Button
      data-test-id="auth-button"
      {...rest}
      className={className}
      classNames={{
        inner: "py-5",
      }}
    />
  );
};

export default AuthButton;
