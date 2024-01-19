import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Textarea,
  Button,
  TextInput,
  NumberInput,
  Flex,
  Text,
  Select,
} from "@mantine/core";
import { z } from "zod";
import { FC } from "react";
import { IconPlus, IconSend, IconTrash } from "@tabler/icons-react";
// TODO : use alias import
import { STATUS, statusShema } from "../../../../../packages/api/models";

const ItemSchema = z.object({
  name: z.string().min(1).max(500),
  description: z.string().min(1).max(200).optional(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

const TransactionSchema = z.object({
  name: z.string().min(1).max(500),
  items: z.array(ItemSchema).nonempty("At least one item is required."),
  status: statusShema,
});

export type TransactionType = z.infer<typeof TransactionSchema>;

interface TransactionFormProps {
  defaultValues?: TransactionType;
  onSubmit: (data: TransactionType) => void;
  isLoading?: boolean;
  errorMessage?: string;
}

const TransactionForm: FC<TransactionFormProps> = ({
  defaultValues = {
    name: "",
    items: [],
  },
  onSubmit,
  isLoading,
  errorMessage,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionType>({
    defaultValues,
    resolver: zodResolver(TransactionSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <Flex direction="column" gap="sm">
        <Text c="blue" size="xl" fw="bold">
          Transaction Name
        </Text>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Transaction name is required." }}
          render={({ field }) => (
            <TextInput
              mb={"lg"}
              placeholder="Enter transaction name"
              {...field}
              error={errors.name?.message}
            />
          )}
        />
      </Flex>

      <Flex direction="column" gap="sm">
        <Text c="blue" size="xl" fw="bold">
          Status
        </Text>
        <Controller
          name="status"
          control={control}
          defaultValue="PENDING"
          render={({ field }) => (
            <Select
              mb={"lg"}
              data={
                [
                  { value: "PENDING", label: "Pending" },
                  { value: "SUCCESS", label: "Success" },
                  { value: "FAILED", label: "Failed" },
                ] satisfies { value: STATUS; label: string }[]
              }
              {...field}
              required
              error={errors.status?.message}
            />
          )}
        />
      </Flex>

      <Flex direction="column" gap="sm">
        {fields.map((item, index) => (
          <Flex direction="column" gap="sm" key={item.id}>
            <Text c="blue" size="xl" fw="bold">
              Item {index + 1}
            </Text>
            <Controller
              name={`items.${index}.name`}
              control={control}
              defaultValue=""
              rules={{ required: "Item name is required." }}
              render={({ field }) => (
                <TextInput
                  mt={-10}
                  label="Item Name"
                  placeholder="Enter item name"
                  {...field}
                  error={errors.items?.[index]?.name?.message}
                />
              )}
            />

            <Controller
              name={`items.${index}.description`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  label="Item Description"
                  placeholder="Enter item description"
                  {...field}
                  error={errors.items?.[index]?.description?.message}
                />
              )}
            />

            <Controller
              name={`items.${index}.quantity`}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <NumberInput
                  label="Quantity"
                  placeholder="Enter quantity"
                  {...field}
                  error={errors.items?.[index]?.quantity?.message}
                />
              )}
            />

            <Controller
              name={`items.${index}.price`}
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <NumberInput
                  step={100000}
                  label="Price"
                  placeholder="Enter price"
                  {...field}
                  error={errors.items?.[index]?.price?.message}
                />
              )}
            />

            <Button
              color="red"
              className="self-end"
              leftSection={<IconTrash size={18} />}
              onClick={() => remove(index)}
            >
              Remove Item
            </Button>
          </Flex>
        ))}

        {errors.items?.root && <Text c="red">{errors.items.root.message}</Text>}
        {errors.items && <Text c="red">{errors.items.message}</Text>}
      </Flex>

      {errorMessage && <Text c="red">{errorMessage}</Text>}

      <Flex justify="flex-end" gap="sm" mt="xl" wrap="wrap">
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() =>
            append({ name: "", description: "", quantity: 1, price: 0 })
          }
        >
          Add Item
        </Button>

        <Button
          loading={isLoading}
          leftSection={<IconSend size={18} />}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default TransactionForm;
