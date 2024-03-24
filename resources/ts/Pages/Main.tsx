import { IntlProvider } from "react-intl";
import { Products } from "./Products/Products";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Main: React.FC = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#ec4899",
            },
            secondary: {
                main: "#3f51b5",
            },
        },
    });
    const router = createBrowserRouter([
        {
            path: "/products/page/:page?",
            element: <Products />,
        },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale="pl" defaultLocale="pl">
                <RouterProvider router={router} />
            </IntlProvider>
        </ThemeProvider>
    );
};

export default Main;
