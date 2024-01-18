import { Flex, Text, Title } from "@mantine/core";
import React, { FC } from "react";

interface AuthProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer: React.ReactNode;
}

const Auth: FC<AuthProps> = ({ children, title, subtitle, footer }) => {
  return (
    <Flex direction="column" gap={20}>
      <Title className="text-4xl font-bold text-gray-9">{title}</Title>
      <Text className="text-lg text-gray-9">{subtitle}</Text>
      {children}
      <div className="text-center">{footer}</div>
    </Flex>
  );
};

export default Auth;
