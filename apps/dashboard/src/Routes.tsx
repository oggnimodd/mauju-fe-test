import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import {
  HomePage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  ForgotPasswordPage,
} from "pages";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

interface Page {
  path: string;
  component: JSX.Element;
  type?: "public" | "authenticated" | "unauthenticated";
}

const routes = [
  {
    path: "/",
    component: <HomePage />,
    type: "authenticated",
  },
  {
    path: "/sign-in",
    component: <SignInPage />,
    type: "unauthenticated",
  },
  {
    path: "/sign-up",
    component: <SignUpPage />,
    type: "unauthenticated",
  },
  {
    path: "/forgot-password",
    component: <ForgotPasswordPage />,
    type: "unauthenticated",
  },
  {
    path: "*",
    component: <NotFoundPage />,
    type: "public",
  },
] satisfies Page[];

const Routes = () => {
  return (
    <ReactRouterRoutes>
      {routes.map(({ path, component, type }) => {
        if (type === "public") {
          return (
            <Route
              element={component}
              path={path}
              key={`router-link-${path}`}
            />
          );
        }

        if (type === "unauthenticated") {
          return (
            <Route
              element={<SignedOut>{component}</SignedOut>}
              path={path}
              key={`router-link-${path}`}
            />
          );
        }

        return (
          <Route
            element={<SignedIn>{component}</SignedIn>}
            path={path}
            key={`router-link-${path}`}
          />
        );
      })}
    </ReactRouterRoutes>
  );
};

export default Routes;
