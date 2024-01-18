import { Flex, Title, Text, Button } from "@mantine/core";
import { FC } from "react";
import clsx from "clsx";

interface BannerProps {
  className?: string;
}

const Banner: FC<BannerProps> = ({ className }) => {
  return (
    <div
      data-test-id="banner"
      className={clsx(
        "flex min-h-screen items-center justify-center bg-banner-gradient relative overflow-hidden",
        className,
      )}
    >
      {/* Circles */}
      <div
        data-test-id="banner-circle"
        className="border border-solid border-blue-8/80 w-2/3 aspect-square rounded-full absolute top-[75%] -left-[25%] z-50"
      />
      <div
        data-test-id="banner-circle"
        className="border border-solid border-blue-8/80 w-2/3 aspect-square rounded-full absolute top-[70%] -left-[35%] z-50"
      />

      {/* Content */}
      <Flex
        direction="column"
        maw="400px"
        gap="sm"
        align="start"
        className="z-[100]"
      >
        <Title
          data-test-id="banner-title"
          className="text-5xl text-white font-bold"
        >
          GoFinance
        </Title>
        <Text data-test-id="banner-subtile" className=" text-white text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo,
          consectetur.
        </Text>

        <Button mt="sm" size="lg" data-test-id="banner-button">
          Read More
        </Button>
      </Flex>
    </div>
  );
};

export default Banner;
