import React, { FC } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";

export const PageWrapper: FC = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};
