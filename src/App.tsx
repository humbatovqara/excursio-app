import React, { useEffect } from "react";
// React Router
import { Route, Routes } from "react-router-dom";
// Redux
import { useAppDispatch } from "./hooks/redux";
import { usersMe } from "./redux/actions/Auth";
import Layout from "./layout";
import Home from "./layout/page";
import Listing from "./layout/Listing";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersMe());
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<Listing />} />
      </Routes>
    </Layout>
  );
};

export default App;
