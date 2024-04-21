import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SearchQueryContext } from "../../contex/searchQueryContex";
import { Navbar } from "../Components/Navbar/Navbar";
import { ProductsSection } from "./Products/ProductsSection";

const Main: React.FC = () => {
    const [query, setQuery] = useState<string>("");
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
        {
            path: "deals",
            element: (
                <>
                    <Navbar />
                    Okazje
                </>
            ),
        },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale="pl" defaultLocale="pl">
                <SearchQueryContext.Provider value={{ query, setQuery }}>
                    <RouterProvider
                        router={router}
                        fallbackElement={
                            <CircularProgress className="mx-auto" size="16" />
                        }
                    />
                </SearchQueryContext.Provider>
            </IntlProvider>
        </ThemeProvider>
    );
};

export default Main;
