import { Auth, SignUpForm } from "components";
import { Link } from "react-router-dom";
import { BannerLayout } from "layouts";

const SignUp = () => {
  return (
    <BannerLayout>
      <Auth
        title="Hello"
        subtitle="Signed Up to Get Started"
        footer={
          <>
            <p>
              Already have an account?{" "}
              <Link className="text-blue-8" to="/sign-in">
                Sign in
              </Link>{" "}
            </p>
            <Link className="text-blue-8" to="/forgot-password">
              Forgot Password
            </Link>{" "}
          </>
        }
      >
        <SignUpForm />
      </Auth>
    </BannerLayout>
  );
};

export default SignUp;
