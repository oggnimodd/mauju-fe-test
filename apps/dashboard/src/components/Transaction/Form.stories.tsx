import Form from "./Form";

export const Empty = () => <Form onSubmit={(data) => console.log(data)} />;

export const WithInitialValues = () => (
  <Form
    onSubmit={(data) => console.log(data)}
    defaultValues={{
      name: "Transaction 1",
      status: "PENDING",
      items: [
        {
          name: "Item 1",
          description: "Description 1",
          quantity: 1,
          price: 10,
        },
        {
          name: "Item 2",
          description: "Description 2",
          quantity: 2,
          price: 20,
        },
      ],
    }}
  />
);
