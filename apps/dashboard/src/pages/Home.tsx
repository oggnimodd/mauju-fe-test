import { Button } from "@mantine/core";
import { api } from "trpc";

const Home = () => {
  const {
    data: message,
    isLoading,
    isError,
  } = api.transaction.hello.useQuery("world");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div>
      <p>Hello, {message}!</p>
      <Button>Hello world</Button>
    </div>
  );
};

export default Home;
