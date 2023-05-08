import React, { useEffect } from "react";
import Layout from "./layout";
// Redux
import { useAppDispatch } from "./hooks/redux";
import { usersMe } from "./redux/actions/Auth";
import Home from "./layout/page";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersMe());
  }, []);

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;
