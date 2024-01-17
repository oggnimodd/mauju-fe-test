import AuthButton from "./AuthButton";
import { Flex } from "@mantine/core";

export const Variants = () => {
  return (
    <Flex direction="column" gap={"lg"} maw="400px">
      <AuthButton onClick={() => console.log("clicked")}>Test</AuthButton>
      <AuthButton loading>Test</AuthButton>
      <AuthButton disabled>Test</AuthButton>
      <AuthButton color="red">Test</AuthButton>
    </Flex>
  );
};
