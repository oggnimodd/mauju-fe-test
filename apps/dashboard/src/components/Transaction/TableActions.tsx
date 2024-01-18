import { ActionIcon } from "@mantine/core";
import { IconEye, IconTrash, IconPencil } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface TableActionsProps {
  id: string;
}

const TableActions: FC<TableActionsProps> = ({ id }) => {
  return (
    <div className="flex gap-2">
      <ActionIcon radius="xl" onClick={() => console.log(id)}>
        <IconTrash size={18} />
      </ActionIcon>
      <ActionIcon radius="xl" component={Link} to={`/transaction/${id}`}>
        <IconEye size={18} />
      </ActionIcon>
      <ActionIcon radius="xl" component={Link} to={`/transaction/${id}/edit`}>
        <IconPencil size={18} />
      </ActionIcon>
    </div>
  );
};

export default TableActions;
