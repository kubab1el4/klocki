import React, { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router";
import { Footer } from "../Footer/Footer";

export const PageWrapper: FC = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};
