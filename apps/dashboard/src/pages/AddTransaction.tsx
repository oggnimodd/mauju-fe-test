import { BaseLayout } from "layouts";
import { PageHeader, TransactionForm } from "components";
import { useNavigate } from "react-router-dom";
import { api } from "trpc";
import { notifications } from "@mantine/notifications";

const AddTransaction = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: createTransaction,
    isLoading,
    error,
  } = api.transaction.create.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Transaction Created",
        message: "Transaction created successfully",
        color: "green",
      });
      navigate("/");
    },
    onError: () => {
      notifications.show({
        title: "Transaction Failed",
        message: "Transaction failed to create",
        color: "red",
      });
    },
  });

  return (
    <BaseLayout>
      <PageHeader title="Create Transaction" />
      <TransactionForm
        onSubmit={createTransaction}
        isLoading={isLoading}
        errorMessage={error?.message}
      />
    </BaseLayout>
  );
};

export default AddTransaction;
