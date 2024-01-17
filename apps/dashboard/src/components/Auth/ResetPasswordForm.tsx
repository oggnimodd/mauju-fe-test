import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@clerk/clerk-react";
import { FC, useState } from "react";
import { AuthButton } from "components";
import { IconAlertTriangle, IconLock } from "@tabler/icons-react";
import { Alert, PasswordInput, TextInput } from "@mantine/core";

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  verificationCode: z.string(),
});

type PasswordData = z.infer<typeof passwordSchema>;

interface ResetPasswordFormProps {
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ setComplete }) => {
  const { isLoaded: isUserLoaded, signIn, setActive } = useSignIn();
  const [secondFactor, setSecondFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<PasswordData> = async (data) => {
    if (!isUserLoaded) return;
    const { password, verificationCode } = data;
    setIsLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: verificationCode,
        password,
      });

      if (result.status === "needs_second_factor") {
        setSecondFactor(true);
      } else if (result.status === "complete") {
        setActive({ session: result.createdSessionId });
        setComplete(true);
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setError("root", { message: err.errors[0].longMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isUserLoaded) return null;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        leftSection={<IconLock className="text-gray-3 dark:text-gray-6" />}
        type="password"
        placeholder="New Password"
        error={errors.password?.message}
        {...register("password")}
      />
      <TextInput
        leftSection={<IconLock className="text-gray-3 dark:text-gray-6" />}
        type="text"
        placeholder="Reset password code"
        error={errors.verificationCode?.message}
        {...register("verificationCode")}
      />

      {errors.root?.message && (
        <Alert mt="sm" color="red" icon={<IconAlertTriangle />}>
          {errors.root.message}
        </Alert>
      )}
      <AuthButton loading={isLoading} type="submit">
        Reset
      </AuthButton>

      {secondFactor && (
        <Alert mt="sm" color="red" icon={<IconAlertTriangle />}>
          2FA is required, this UI does not handle that
        </Alert>
      )}
    </form>
  );
};

export default ResetPasswordForm;
