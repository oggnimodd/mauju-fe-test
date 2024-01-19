import { FC } from "react";
import { useUser } from "@clerk/clerk-react";
import { Flex, Text, Avatar } from "@mantine/core";
import { PageHeader } from "components";
import { BaseLayout } from "layouts";

const Profile: FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <BaseLayout>
      <PageHeader title="Profile" />
      <Flex direction="column" gap="sm" align="center" justify="center" pt="lg">
        <Avatar src={user?.imageUrl} size="xl" radius="xl" />
        <Text>{user?.fullName}</Text>
        <Text>{user?.emailAddresses[0].emailAddress}</Text>
      </Flex>
    </BaseLayout>
  );
};

export default Profile;
