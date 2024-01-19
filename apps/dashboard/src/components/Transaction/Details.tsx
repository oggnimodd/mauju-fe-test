import { Transaction, Item } from "@acme/db";
import { Text, Flex } from "@mantine/core";
import { FC } from "react";

interface DetailsProps {
  transaction: Transaction & { items: Item[] };
}

const Details: FC<DetailsProps> = ({ transaction }) => {
  return (
    <div>
      <Flex mb={20} direction="column" gap="sm">
        <Flex direction="column" gap="sm">
          <Text c="blue" size="xl" fw="bold">
            Transaction Name
          </Text>
          <Text>{transaction.name}</Text>
        </Flex>

        <Flex direction="column" gap="sm">
          <Text c="blue" size="xl" fw="bold">
            Status
          </Text>
          <Text>{transaction.status}</Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        {transaction.items.map((item, index) => (
          <Flex direction="column" gap="sm" key={item.id}>
            <Text c="blue" size="xl" fw="bold">
              Item {index + 1}
            </Text>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: {item.price}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default Details;
