import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Flex } from "@mantine/core";
import AuthButton from "./AuthButton";

export const SignIn = () => {
  return <SignInForm />;
};

export const SignUp = () => {
  return <SignUpForm />;
};

export const ForgotPassword = () => {
  return <ForgotPasswordForm />;
};

export const Button = () => {
  return (
    <Flex direction="column" gap={"lg"} maw="400px">
      <AuthButton onClick={() => console.log("clicked")}>Test</AuthButton>
      <AuthButton loading>Test</AuthButton>
      <AuthButton disabled>Test</AuthButton>
      <AuthButton color="red">Test</AuthButton>
    </Flex>
  );
};
