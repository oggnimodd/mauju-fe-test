import { useLadleContext, ActionType, ThemeState } from "@ladle/react";

export const useLadleTheme = () => {
  const { globalState, dispatch } = useLadleContext();

  const toggleTheme = () => {
    dispatch({
      type: ActionType.UpdateTheme,
      value:
        globalState.theme === ThemeState.Dark
          ? ThemeState.Light
          : ThemeState.Dark,
    });
  };

  return { toggleTheme, theme: globalState.theme };
};
