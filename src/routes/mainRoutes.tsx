import { Outlet } from "react-router-dom";
import Layout from "../layout";

const MainRoutes = (props: any) => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default MainRoutes;
