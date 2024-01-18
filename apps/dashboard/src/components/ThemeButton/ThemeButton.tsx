import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSun } from "@tabler/icons-react";
import clsx from "clsx";
import { FC } from "react";

interface ThemeButtonProps {
  className?: string;
}

const ThemeButton: FC<ThemeButtonProps> = ({ className }) => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      className={clsx("w-[40px] h-[40px]", className)}
      radius="xl"
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
    >
      {isDark ? <IconMoonFilled size={20} /> : <IconSun size={20} />}
    </ActionIcon>
  );
};

export default ThemeButton;
