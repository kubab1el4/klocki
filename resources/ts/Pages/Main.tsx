import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { IntlProvider } from "react-intl";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
            path: "/products/:themeId?",
            element: <ProductsSection />,
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
