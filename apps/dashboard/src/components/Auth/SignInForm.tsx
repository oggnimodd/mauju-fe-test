import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@clerk/clerk-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import { IconMail, IconLock, IconAlertTriangle } from "@tabler/icons-react";
import AuthTextInput from "./AuthTextInput";
import AuthPasswordInput from "./AuthPasswordInput";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignInData = z.infer<typeof schema>;

const SignInForm: FC = () => {
  const { isLoaded: isUserLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    if (!isUserLoaded) return;
    const { email, password } = data;
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setError("root", { message: err.errors[0].longMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <AuthTextInput
        leftSection={<IconMail className="text-gray-3 dark:text-gray-6" />}
        placeholder="Email address"
        error={errors.email?.message}
        {...register("email")}
      />
      <AuthPasswordInput
        leftSection={<IconLock className="text-gray-3 dark:text-gray-6" />}
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        {...register("password")}
      />

      {errors.root?.message && (
        <Alert
          className="px-8"
          radius="xl"
          color="red"
          data-test-id="error-alert"
          icon={<IconAlertTriangle />}
        >
          {errors.root.message}
        </Alert>
      )}
      <AuthButton loading={isLoading} fullWidth type="submit">
        Sign In
      </AuthButton>
    </form>
  );
};

export default SignInForm;
