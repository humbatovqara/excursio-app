import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const PublicRoutes = (props: any) => {
  const { loginUser } = useAppSelector((state) => state.auth);
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (loginUser?.is_success) {
      if (location.state) {
        navigate(location.state);
        return;
      }
      navigate("/");
    }
  }, [loginUser]);
  return !loginUser?.is_success ? <Outlet /> : null;
};

export default PublicRoutes;
