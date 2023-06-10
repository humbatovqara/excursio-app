import React, { useEffect } from "react";
// React Router
import { Route, Routes } from "react-router-dom";
// Redux
import { useAppDispatch } from "./hooks/redux";
import { usersMe } from "./redux/actions/Auth";
import { getAllAmentys, getRooms } from "./redux/actions/Room";
//
import Layout from "./layout";
import Home from "./layout/page";
import Listing from "./layout/Listing";
import TripsPage from "./layout/tripsPage";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersMe());
    dispatch(getRooms());
    dispatch(getAllAmentys());
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<TripsPage />} />
        <Route path="/listings/:id" element={<Listing />} />
      </Routes>
    </Layout>
  );
};

export default App;
