import React from "react";
// Components
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientsOnly";
import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import ToasterProvider from "../providers/ToasterProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
