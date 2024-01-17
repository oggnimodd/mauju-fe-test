import { FC } from "react";
import { Banner } from "components";
import { BaseLayoutType } from "./types";
import { Flex } from "@mantine/core";

const BannerLayout: FC<BaseLayoutType> = ({ children }) => {
  return (
    <Flex>
      <Banner className="w-7/12" />
      <Flex className="w-5/12" justify="center" align="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default BannerLayout;
