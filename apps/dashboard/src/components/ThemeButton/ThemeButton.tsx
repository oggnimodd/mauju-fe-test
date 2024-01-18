import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSun } from "@tabler/icons-react";
import clsx from "clsx";
import { FC } from "react";

interface ThemeButtonProps {
  className?: string;
}

const THEME_BUTTON_SIZE = 18;

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
      {isDark ? (
        <IconSun size={THEME_BUTTON_SIZE} />
      ) : (
        <IconMoonFilled size={THEME_BUTTON_SIZE} />
      )}
    </ActionIcon>
  );
};

export default ThemeButton;
