import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { IntlProvider } from "react-intl";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { ProductsSection } from "./Products/ProductsSection";

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
            path: "/",
            element: <Navbar />,
        },
        { path: "products/:themeId?", element: <ProductsSection /> },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale="pl" defaultLocale="pl">
                <RouterProvider
                    router={router}
                    fallbackElement={
                        <CircularProgress className="mx-auto" size="16" />
                    }
                ></RouterProvider>
            </IntlProvider>
        </ThemeProvider>
    );
};

export default Main;
