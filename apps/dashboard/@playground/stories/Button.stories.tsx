import { Button, Flex } from "@mantine/core";
import React from "react";

export const Variants = () => {
  return (
    <Flex direction="column" gap="lg">
      <Flex gap="lg">
        <Button color="blue">Blue</Button>
        <Button color="red">Red</Button>
        <Button color="green">Green</Button>
        <Button color="yellow">Yellow</Button>
      </Flex>

      <div>
        <Button>Blue</Button>
        <Button className="mt-2" fullWidth>
          Blue
        </Button>
      </div>

      <Flex gap="lg" wrap="wrap">
        <Button color="blue.1">Blue</Button>
        <Button color="blue.2">Blue</Button>
        <Button color="blue.3">Blue</Button>
        <Button color="blue.4">Blue</Button>
        <Button color="blue.5">Blue</Button>
        <Button color="blue.6">Blue</Button>
        <Button color="blue.7">Blue</Button>
        <Button color="blue.8">Blue</Button>
        <Button color="blue.9">Blue</Button>
      </Flex>
    </Flex>
  );
};
