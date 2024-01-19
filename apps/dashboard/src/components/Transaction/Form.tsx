import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Textarea,
  Button,
  TextInput,
  NumberInput,
  Flex,
  Text,
} from "@mantine/core";
import { z } from "zod";
import { FC } from "react";
import { IconPlus, IconSend, IconTrash } from "@tabler/icons-react";

const ItemSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200).optional(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

const TransactionSchema = z.object({
  name: z.string().min(1).max(50),
  items: z.array(ItemSchema).nonempty("At least one item is required."),
});

type TransactionType = z.infer<typeof TransactionSchema>;

interface TransactionFormProps {
  defaultValues?: TransactionType;
  onSubmit: (data: TransactionType) => void;
}

const TransactionForm: FC<TransactionFormProps> = ({
  defaultValues = {
    name: "",
    items: [],
  },
  onSubmit,
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
      <Flex direction="column" gap="lg">
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
              mb={"xl"}
              placeholder="Enter transaction name"
              {...field}
              error={errors.name?.message}
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
      </Flex>

      <Flex justify="flex-end" gap="sm" mt="xl" wrap="wrap">
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() =>
            append({ name: "", description: "", quantity: 1, price: 0 })
          }
        >
          Add Item
        </Button>

        <Button leftSection={<IconSend size={18} />} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default TransactionForm;
