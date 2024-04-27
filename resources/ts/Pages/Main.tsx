import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { IntlProvider } from "react-intl";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { PageWrapper } from "../Components/PageWrapper/PageWrapper";
import { productsRoute } from "../routes/routes";
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
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<PageWrapper />}>
                <Route
                    path={`${productsRoute}/:themeId?`}
                    element={<ProductsSection />}
                />
                <Route path="deals" element={<div>Okazje</div>} />
            </Route>
        )
    );

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale="pl" defaultLocale="pl">
                <RouterProvider
                    router={router}
                    fallbackElement={
                        <CircularProgress className="mx-auto" size="16" />
                    }
                />
            </IntlProvider>
        </ThemeProvider>
    );
};

export default Main;
