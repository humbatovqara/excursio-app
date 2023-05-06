import React, { useEffect } from "react";
import Layout from "./layout";
// Redux
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { usersMe } from "./redux/actions/Auth";

const App = () => {
  const dispatch = useAppDispatch();
  const {
    auth: { loginUser },
  } = useAppSelector((state) => state);

  // console.log("loginUser: ", loginUser);

  useEffect(() => {
    dispatch(usersMe());
  }, []);

  return <Layout />;
};

export default App;
