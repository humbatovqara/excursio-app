import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const ProtectedRoutes = (props: any) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login", { state: location.pathname });
    }
  }, [isAuth]);
  return isAuth ? <Outlet /> : null;
};

export default ProtectedRoutes;
