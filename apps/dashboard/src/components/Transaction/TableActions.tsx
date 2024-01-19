import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEye, IconTrash, IconPencil } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { api } from "trpc";
import { notifications } from "@mantine/notifications";

interface TableActionsProps {
  id: string;
}

const TableActions: FC<TableActionsProps> = ({ id }) => {
  const apiUtils = api.useUtils();

  const { mutateAsync: deleteTransaction, isLoading } =
    api.transaction.delete.useMutation({
      onSuccess: () => {
        notifications.show({
          title: "Transaction Deleted",
          message: "Transaction deleted successfully",
          color: "green",
        });
        apiUtils.transaction.getAll.invalidate();
      },
      onError: () => {
        notifications.show({
          title: "Transaction Failed",
          message: "Transaction failed to delete",
          color: "red",
        });
      },
    });

  const handleDelete = async () => {
    await deleteTransaction(id);
  };

  return (
    <div className="flex gap-2">
      <Tooltip label="Delete Transaction">
        <ActionIcon
          loading={isLoading}
          radius="xl"
          onClick={() => handleDelete()}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="View Transaction">
        <ActionIcon radius="xl" component={Link} to={`/transaction/${id}`}>
          <IconEye size={18} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Edit Transaction">
        <ActionIcon radius="xl" component={Link} to={`/transaction/${id}/edit`}>
          <IconPencil size={18} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default TableActions;
