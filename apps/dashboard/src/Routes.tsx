import { Navigate, Routes as ReactRouterRoutes, Route } from "react-router-dom";
import {
  HomePage,
  AddTransactionPage,
  EditTransactionPage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  ForgotPasswordPage,
  DetailsTransactionPage,
  ProfilePage,
} from "pages";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignedOutOnly } from "components";

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
    path: "/profile",
    component: <ProfilePage />,
    type: "authenticated",
  },
  {
    path: "/transaction/:id",
    component: <DetailsTransactionPage />,
    type: "authenticated",
  },
  {
    path: "/transaction/new",
    component: <AddTransactionPage />,
    type: "authenticated",
  },
  {
    path: "/transaction/:id/edit",
    component: <EditTransactionPage />,
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
        // Public routes
        if (type === "public") {
          return (
            <Route
              element={component}
              path={path}
              key={`router-link-${path}`}
            />
          );
        }

        // Only accessible if user is not signed in
        if (type === "unauthenticated") {
          return (
            <Route
              element={<SignedOutOnly>{component}</SignedOutOnly>}
              path={path}
              key={`router-link-${path}`}
            />
          );
        }

        // Only accessible if user is signed in
        return (
          <Route
            element={
              <>
                <SignedIn>{component}</SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" replace />
                </SignedOut>
              </>
            }
            path={path}
            key={`router-link-${path}`}
          />
        );
      })}
    </ReactRouterRoutes>
  );
};

export default Routes;
