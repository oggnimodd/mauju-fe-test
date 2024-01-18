import { FC } from "react";
import { Banner, ThemeButton } from "components";
import { BaseLayoutType } from "./types";
import { Flex } from "@mantine/core";

const BannerLayout: FC<BaseLayoutType> = ({ children }) => {
  return (
    <Flex pos="relative" align="center" mih="100vh">
      <ThemeButton className="absolute top-4 right-4" />
      <Banner className="xl:w-7/12" />
      <Flex
        className="w-full h-full xl:w-5/12 p-4"
        justify="center"
        align="center"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default BannerLayout;
