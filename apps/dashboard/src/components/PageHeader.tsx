import { Flex, Title, Button } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import clsx from "clsx";

interface PageHeaderProps {
  title: string;
  actions: React.ReactNode;
  hideActions?: boolean;
}

const PageHeader: FC<PageHeaderProps> = ({ title, actions, hideActions }) => {
  return (
    <Flex align="center" py="lg">
      <Title className="text-2xl font-bold xs:text-3xl" order={2}>
        {title}
      </Title>

      <div className={clsx("ml-auto", hideActions && "hidden")}>
        {!actions ? (
          <Button leftSection={<IconArrowLeft />} component={Link} to="/">
            Back
          </Button>
        ) : (
          actions
        )}
      </div>
    </Flex>
  );
};

export default PageHeader;
