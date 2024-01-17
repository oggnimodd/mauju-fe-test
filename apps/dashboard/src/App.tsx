import { FC } from "react";
import Provider from "Provider";
import Routes from "Routes";

const App: FC = () => {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
};

export default App;
