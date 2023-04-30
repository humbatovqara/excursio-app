import React from "react";
// Components
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientsOnly";
import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import ToasterProvider from "../providers/ToasterProvider";
import { useAppSelector } from "../hooks/redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    auth: { currentUser },
  } = useAppSelector((state) => state);

  console.log("Layout Index: ", currentUser);
  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
      </ClientOnly>
      {children}
    </>
  );
};

export default Layout;
