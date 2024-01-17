import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { Home } from "pages";

interface Page {
  path: string;
  component: () => JSX.Element;
  isPublic?: boolean;
}

const routes: Page[] = [{ path: "/", component: Home, isPublic: true }];

const Routes = () => {
  return (
    <ReactRouterRoutes>
      {routes.map(({ path, component: Item, isPublic }) => {
        if (isPublic) {
          return (
            <Route element={<Item />} path={path} key={`router-link-${path}`} />
          );
        }
      })}
    </ReactRouterRoutes>
  );
};

export default Routes;
