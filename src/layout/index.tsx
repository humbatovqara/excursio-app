import React from "react";
// Redux
import { useAppSelector } from "../hooks/redux";
// Components
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientsOnly";
import SearchModal from "../components/modals/SearchModal";
import RentModal from "../components/modals/RentModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";
import Loading from "../loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    room: { isLoading },
  } = useAppSelector((state) => state);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <SearchModal />
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
