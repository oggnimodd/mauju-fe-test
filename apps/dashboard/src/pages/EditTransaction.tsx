import { BaseLayout } from "layouts";
import { PageHeader, TransactionForm } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "trpc";
import { notifications } from "@mantine/notifications";
import { TransactionType } from "components/Transaction/Form";

type OperationType = "CREATE" | "UPDATE" | "DELETE";

const EditTransaction = () => {
  const apiUtils = api.useUtils();

  // Get the transaction ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Get transaction details
  const {
    data: transaction,
    isLoading: isLoadingTransaction,
    error: errorTransaction,
  } = api.transaction.get.useQuery(id as string, {
    enabled: !!id,
  });

  const {
    mutateAsync: updateTransaction,
    isLoading: isUpdating,
    error: errorUpdating,
  } = api.transaction.update.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Transaction Updated",
        message: "Transaction updated successfully",
        color: "green",
      });
      apiUtils.transaction.get.invalidate(id as string);
      navigate("/");
    },
    onError: () => {
      notifications.show({
        title: "Transaction Failed",
        message: "Transaction failed to update",
        color: "red",
      });
    },
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

  const handleEdit = (data: TransactionType) => {
    const itemIds = transaction?.items.map((item) => item.id);
    const itemDataWithIds = data.items.map((item, index) => ({
      id: itemIds?.[index],
      ...item,
    }));

    // Find all the new transaction items
    const newItems = itemDataWithIds
      .filter((item) => !itemIds.includes(item.id))
      .map((item) => {
        return {
          ...item,
          operation: "CREATE" as OperationType,
        };
      });

    // Find all the deleted transaction items
    const deletedItems = itemIds
      .filter((itemId) => !itemDataWithIds.some((item) => item.id === itemId))
      .map((itemId) => ({
        id: itemId,
        operation: "DELETE" as OperationType,
      }));

    // If item is not deleted than just use update
    const updatedItems = itemDataWithIds
      .filter(
        (item) =>
          !deletedItems.some((deletedItem) => deletedItem.id === item.id),
      )
      .map((item) => ({
        ...item,
        operation: "UPDATE" as OperationType,
      }));

    updateTransaction({
      id: id as string,
      ...data,
      items: [...newItems, ...deletedItems, ...updatedItems],
    });
  };

  return (
    <BaseLayout>
      <PageHeader title="Edit Transaction" />
      <TransactionForm
        onSubmit={handleEdit}
        isLoading={isUpdating}
        errorMessage={errorUpdating?.message}
        defaultValues={transaction as unknown as TransactionType}
      />
    </BaseLayout>
  );
};

export default EditTransaction;
