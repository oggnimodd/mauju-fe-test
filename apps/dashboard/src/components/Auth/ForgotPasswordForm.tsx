import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@clerk/clerk-react";
import { FC, useState } from "react";
import AuthButton from "./AuthButton";
import { IconMail, IconAlertTriangle } from "@tabler/icons-react";
import ResetPasswordForm from "./ResetPasswordForm";
import { Link } from "react-router-dom";
import AuthTextInput from "./AuthTextInput";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: FC = () => {
  const { isLoaded: isUserLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
    if (!isUserLoaded) return;
    const { email } = data;
    setIsLoading(true);

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      console.log(err.errors[0]);
      setError("root", { message: err.errors[0].longMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isUserLoaded) return null;

  if (successfulCreation && !complete) {
    return <ResetPasswordForm setComplete={setComplete} />;
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {!successfulCreation && !complete && (
        <>
          <AuthTextInput
            leftSection={<IconMail className="text-gray-3 dark:text-gray-6" />}
            placeholder="Email address"
            error={errors.email?.message}
            {...register("email")}
          />

          {errors.root?.message && (
            <Alert color="red" icon={<IconAlertTriangle />}>
              {errors.root.message}
            </Alert>
          )}
          <AuthButton loading={isLoading} type="submit">
            Send
          </AuthButton>
        </>
      )}

      {complete && (
        <Alert color="green" icon={<IconAlertTriangle />}>
          You successfully changed your password.{" "}
          <Link to="/login" className="text-green-5 font-semibold">
            Back to login
          </Link>
        </Alert>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
