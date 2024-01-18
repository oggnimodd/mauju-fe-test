import { FC } from "react";
import { STATUS } from "@acme/api/node";
import { Badge } from "@mantine/core";

interface StatusBadgeProps {
  status: STATUS;
}

const size = "lg";
const fontWeight = "bold";

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge color="yellow" size={size} fw={fontWeight}>
          Pending
        </Badge>
      );
    case "SUCCESS":
      return (
        <Badge color="green" size={size} fw={fontWeight}>
          Success
        </Badge>
      );
    case "FAILED":
      return (
        <Badge color="red" size={size} fw={fontWeight}>
          Failed
        </Badge>
      );
    default:
      return null;
  }
};

export default StatusBadge;
