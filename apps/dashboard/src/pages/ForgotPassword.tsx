import { Auth, ForgotPasswordForm } from "components";
import { BannerLayout } from "layouts";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <BannerLayout>
      <Auth
        title="Forgot Password"
        subtitle="Enter your email address"
        footer={
          <>
            <p>
              Dont have an account?{" "}
              <Link className="text-blue-8" to="/sign-up">
                Sign Up
              </Link>{" "}
            </p>
            <Link className="text-blue-8" to="/sign-in">
              Sign In
            </Link>{" "}
          </>
        }
      >
        <ForgotPasswordForm />
      </Auth>
    </BannerLayout>
  );
};

export default ForgotPassword;
