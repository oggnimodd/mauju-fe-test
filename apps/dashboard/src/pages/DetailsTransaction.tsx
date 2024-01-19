import { BaseLayout } from "layouts";
import { PageHeader, TransactionDetails } from "components";
import { Link, useParams } from "react-router-dom";
import { api } from "trpc";
import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

const DetailsTransaction = () => {
  // Get the transaction ID from the URL
  const { id } = useParams();

  // Get transaction details
  const {
    data: transaction,
    isLoading: isLoadingTransaction,
    error: errorTransaction,
  } = api.transaction.get.useQuery(id as string, {
    enabled: !!id,
  });

  if (isLoadingTransaction) {
    return (
      <BaseLayout>
        <p>Loading...</p>
      </BaseLayout>
    );
  }

  if (errorTransaction) {
    return (
      <BaseLayout>
        <p>{errorTransaction.message}</p>
      </BaseLayout>
    );
  }

  return (
    <div>
      <BaseLayout>
        <PageHeader
          title="Transaction Details"
          actions={
            <Button
              leftSection={<IconEdit />}
              component={Link}
              to={`/transaction/${id}/edit`}
            >
              Edit
            </Button>
          }
          includeBackButton
        />
        <TransactionDetails transaction={transaction} />
      </BaseLayout>
    </div>
  );
};

export default DetailsTransaction;
