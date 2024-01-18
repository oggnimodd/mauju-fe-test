import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUp } from "@clerk/clerk-react";
import { FC, useState } from "react";
import AuthButton from "./AuthButton";
import {
  IconMail,
  IconLock,
  IconAlertTriangle,
  IconUser,
} from "@tabler/icons-react";
import EmailVerificationForm from "./EmailVerificationForm";
import AuthTextInput from "./AuthTextInput";
import AuthPasswordInput from "./AuthPasswordInput";

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(32, "Name must be at most 32 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignUpData = z.infer<typeof signUpSchema>;

const SignUpForm: FC = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded: isUserLoaded, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    if (!isUserLoaded) return;
    const { name, email, password } = data;
    setIsLoading(true);

    try {
      await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      setError("root", { message: err.errors[0].longMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isUserLoaded) return null;

  if (pendingVerification) {
    return <EmailVerificationForm />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <AuthTextInput
        leftSection={<IconUser className="text-gray-3 dark:text-gray-6" />}
        placeholder="Name"
        error={errors.name?.message}
        {...register("name")}
      />
      <AuthTextInput
        error={errors.email?.message}
        leftSection={<IconMail className="text-gray-3 dark:text-gray-6" />}
        placeholder="Email address"
        {...register("email")}
      />
      <AuthPasswordInput
        error={errors.password?.message}
        leftSection={<IconLock className="text-gray-3 dark:text-gray-6" />}
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.root?.message && (
        <Alert
          className="px-8"
          radius="xl"
          color="red"
          icon={<IconAlertTriangle />}
        >
          {errors.root.message}
        </Alert>
      )}
      <AuthButton loading={isLoading} fullWidth type="submit">
        Sign Up
      </AuthButton>
    </form>
  );
};

export default SignUpForm;
