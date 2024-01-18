import { Button } from "@mantine/core";
import { api } from "trpc";
import { useAuth } from "@clerk/clerk-react";

const Home = () => {
  const { signOut } = useAuth();
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
      <Button onClick={() => signOut()} color="red.6">
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
