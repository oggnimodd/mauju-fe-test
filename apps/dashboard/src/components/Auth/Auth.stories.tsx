import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Flex } from "@mantine/core";
import AuthButton from "./AuthButton";
import AuthTextInput from "./AuthTextInput";
import { Icon24Hours } from "@tabler/icons-react";
import AuthPasswordInput from "./AuthPasswordInput";
import Auth from "./Auth";
import { Link } from "react-router-dom";

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

export const TextInput = () => {
  return (
    <Flex direction="column" gap={20}>
      <AuthTextInput leftSection={<Icon24Hours />} />
      <AuthPasswordInput leftSection={<Icon24Hours />} />
    </Flex>
  );
};

export const AuthComponent = () => {
  return (
    <Auth
      title="Hello Again!"
      subtitle="Welcome Back"
      footer={
        <>
          <p>
            Dont have an account?{" "}
            <Link className="text-blue-8" to="/sign-up">
              Sign Up
            </Link>{" "}
          </p>
          <Link className="text-blue-8" to="/forgot-password">
            Forgot Password
          </Link>{" "}
        </>
      }
    >
      <SignInForm />
    </Auth>
  );
};
