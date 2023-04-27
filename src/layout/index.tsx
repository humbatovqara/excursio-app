import React from "react";
// Components
import Navbar from "../containers/navbar/Navbar";
import ClientOnly from "../containers/ClientsOnly";
import RegisterModal from "../components/modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";
import { useAppSelector } from "../hooks/redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    auth: { isAuth },
  } = useAppSelector((state) => state);

  console.log(isAuth);
  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
      </ClientOnly>
      {children}
    </>
  );
};

export default Layout;
