import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const PublicRoutes = (props: any) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (isAuth) {
      if (location.state) {
        navigate(location.state);
        return;
      }
      navigate("/");
    }
  }, [isAuth]);
  return isAuth === false ? <Outlet /> : null;
};

export default PublicRoutes;
