import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")}>
      <img
        src="/logo.png"
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Logo;
