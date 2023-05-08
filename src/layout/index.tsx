import React from "react";
// Components
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientsOnly";
import RentModal from "../components/modals/RentModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
};

export default Layout;
