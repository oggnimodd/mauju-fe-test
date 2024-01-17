import Banner from "./Banner";
import { Flex } from "@mantine/core";

export const Default = () => {
  return (
    <Flex>
      <Banner className="w-7/12" />
      <Flex className="w-5/12" justify="center" align="center">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit,
          distinctio.
        </p>
      </Flex>
    </Flex>
  );
};
