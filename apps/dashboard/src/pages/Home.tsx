import { TransactionTable, PageHeader } from "components";
import { BaseLayout } from "layouts";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const Home = () => {
  return (
    <BaseLayout>
      <PageHeader
        title="Transactions"
        actions={
          <Button
            component={Link}
            to="/transaction/new"
            leftSection={<IconPlus />}
          >
            Add
          </Button>
        }
      />
      <TransactionTable />
    </BaseLayout>
  );
};

export default Home;
