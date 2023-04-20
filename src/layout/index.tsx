import React from 'react'
// Components
import Navbar from '../containers/navbar/Navbar';
import ClientOnly from '../containers/ClientsOnly';
import RegisterModal from '../components/modals/RegisterModal';
import ToasterProvider from '../providers/ToasterProvider';

const Layout = ({
    children,
    }:{
        children: React.ReactNode
    }) => {
    return (
        <>
            <ClientOnly>
                <ToasterProvider />
                <RegisterModal />
                <Navbar />
            </ClientOnly>
            {children}
        </>
    )
}

export default Layout