import React, { FC } from "react";
import { api } from "../trpc";
import { SignInButton, SignOutButton, useAuth } from "@clerk/clerk-react";
import { Button, Text } from "@mantine/core";
import type { StoryDefault } from "@ladle/react";

export default {
  title: "Auth",
} satisfies StoryDefault;

export const Login: FC = () => {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>loading..</p>;
  }

  return (
    <div>
      {!userId && (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
      {userId && (
        <>
          <SignOutButton>
            <Button color="red">Logout</Button>
          </SignOutButton>
          <Text className="mt-3">Congrats, You are see this secret</Text>
        </>
      )}
    </div>
  );
};
