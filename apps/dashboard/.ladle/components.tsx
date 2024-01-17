import React, { useEffect, useLayoutEffect } from "react";
import type { GlobalProvider } from "@ladle/react";
import AppProvider from "../src/Provider";

import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "../src/styles/index.css";
import "./ladle.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const theme = globalState.theme;

  useLayoutEffect(() => {
    const body = document.body;
    const html = document.querySelector("html");

    if (theme === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");

      html?.setAttribute("data-mantine-color-scheme", "dark");
    } else if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");

      html?.setAttribute("data-mantine-color-scheme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const body = document.body;
    const targetNode = document.querySelector("html");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const mantineAttribute = "data-mantine-color-scheme";

        if (
          mutation.type === "attributes" &&
          mutation.attributeName === mantineAttribute
        ) {
          // Handle the attribute change here

          const newTheme = targetNode?.getAttribute(mantineAttribute);

          if (newTheme) {
            if (newTheme === "dark") {
              body.classList.remove("light");
              body.classList.add("dark");

              targetNode?.setAttribute("data-theme", "dark");
            } else if (newTheme === "light") {
              body.classList.remove("dark");
              body.classList.add("light");

              targetNode?.setAttribute("data-theme", "light");
            }
          }
        }
      });
    });

    const config = { attributes: true };

    if (targetNode) {
      observer.observe(targetNode, config);
    }

    // Don't forget to disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={theme}>
      <AppProvider>{children}</AppProvider>
    </div>
  );
};
