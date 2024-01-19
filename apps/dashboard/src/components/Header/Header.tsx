import { FC } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Container,
  Avatar,
  useMantineTheme,
  Group,
  Title,
  Menu,
  rem,
  UnstyledButton,
  Text,
  Burger,
  useMantineColorScheme,
  Paper,
  ActionIcon,
  CloseIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  IconChevronDown,
  IconLogout,
  IconUser,
  IconPlus,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

const Header: FC = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const ThemeIcon = isDark ? IconSun : IconMoon;

  const mobileHeaderItemClassName =
    "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-4 hover:text-white cursor-pointer";

  return (
    <>
      <header className="bg-blue-5">
        <Container className="py-2" size="lg">
          <Group justify="items-center">
            <Link to="/" className="no-underline text-white mr-auto">
              <Title className="text-2xl md:text-3xl" order={1}>
                GoFinance
              </Title>
            </Link>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
              color="white"
            />

            {isLoaded && isSignedIn && (
              <div className="hidden xs:block">
                <Menu
                  width={260}
                  position="bottom-end"
                  transitionProps={{ transition: "pop-top-right" }}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton className="text-white hover:bg-blue-4 px-3 py-2 rounded-lg">
                      <Group gap={7}>
                        <Avatar
                          src={user?.imageUrl}
                          alt={user?.fullName || "Profile picture"}
                          radius="xl"
                          size={30}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                          {user?.fullName}
                        </Text>
                        <IconChevronDown
                          style={{ width: rem(20), height: rem(20) }}
                          stroke={1.6}
                        />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      component={Link}
                      to="/transaction/new"
                      leftSection={
                        <IconPlus
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      New Transaction
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      to="/profile"
                      leftSection={
                        <IconUser
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => setColorScheme(isDark ? "light" : "dark")}
                      leftSection={
                        <ThemeIcon
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Switch Theme
                    </Menu.Item>

                    <Menu.Item
                      onClick={() => signOut()}
                      color="red.6"
                      leftSection={
                        <IconLogout
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.red[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            )}
          </Group>
        </Container>
      </header>

      {opened && (
        <Paper
          radius="0"
          p="md"
          className="fixed h-screen inset-0 flex flex-col z-[999] xs:hidden px-2 gap-y-3"
        >
          <ActionIcon className="ml-auto" onClick={toggle} color="blue.4">
            <CloseIcon />
          </ActionIcon>

          <Link className={mobileHeaderItemClassName} to="/transaction/new">
            <IconPlus
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.6}
            />
            <Text fw={500}>New Transaction</Text>
          </Link>
          <Link className={mobileHeaderItemClassName} to="/profile">
            <IconUser
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
            <Text fw={500}>Profile</Text>
          </Link>
          <Text
            tabIndex={0}
            className={mobileHeaderItemClassName}
            onClick={() => setColorScheme(isDark ? "light" : "dark")}
            role="button"
            fw={500}
          >
            <ThemeIcon
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
            Switch Theme
          </Text>
          <Text
            tabIndex={0}
            className={mobileHeaderItemClassName}
            onClick={() => signOut()}
            role="button"
            fw={500}
          >
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
            Logout
          </Text>
        </Paper>
      )}
    </>
  );
};

export default Header;
