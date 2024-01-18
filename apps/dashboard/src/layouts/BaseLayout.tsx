import { FC } from "react";
import { Container } from "@mantine/core";
import { Header } from "components/Header";
import { BaseLayoutType } from "./types";

const BaseLayout: FC<BaseLayoutType> = ({ children }) => {
  return (
    <>
      <Header />
      <Container size="lg" py="lg">
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
