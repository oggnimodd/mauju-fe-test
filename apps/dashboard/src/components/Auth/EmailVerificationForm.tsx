import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, TextInput } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUp } from "@clerk/clerk-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import { IconLock, IconAlertTriangle } from "@tabler/icons-react";

const emailVerificationSchema = z.object({
  verificationCode: z.string(),
});

type EmailVerificationData = z.infer<typeof emailVerificationSchema>;

const EmailVerificationForm: FC = () => {
  const { isLoaded: isUserLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EmailVerificationData>({
    resolver: zodResolver(emailVerificationSchema),
  });

  const onSubmit: SubmitHandler<EmailVerificationData> = async (data) => {
    if (!isUserLoaded) return;
    const { verificationCode } = data;
    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      }
    } catch (err: any) {
      setError("root", { message: err.errors[0].message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <TextInput
        error={errors.verificationCode?.message}
        leftSection={<IconLock className="text-gray-3 dark:text-gray-6" />}
        placeholder="Verification Code"
        {...register("verificationCode")}
      />

      {errors.root?.message && (
        <Alert mt="sm" color="red" icon={<IconAlertTriangle />}>
          {errors.root.message}
        </Alert>
      )}
      <AuthButton loading={isLoading} fullWidth mt="sm" type="submit">
        Verify Email
      </AuthButton>
    </form>
  );
};

export default EmailVerificationForm;
