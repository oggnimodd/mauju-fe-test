import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 justify-center flex-col items-center gap-y-3">
      <Text className="font-bold">Page not found</Text>
      <Link to="/">
        <Button
          leftSection={<IconArrowLeft />}
          variant="contained"
          color="primary"
        >
          Back To Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
