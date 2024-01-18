import { Auth, SignInForm } from "components";
import { Link } from "react-router-dom";
import { BannerLayout } from "layouts";

const SignIn = () => {
  return (
    <BannerLayout>
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
    </BannerLayout>
  );
};

export default SignIn;
