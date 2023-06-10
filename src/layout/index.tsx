import React from "react";
// Redux
import { useAppSelector } from "../hooks/redux";
// Components
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientsOnly";
import RentModal from "../components/modals/RentModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    room: { isLoading },
  } = useAppSelector((state) => state);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
