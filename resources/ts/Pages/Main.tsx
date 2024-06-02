import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { PageWrapper } from "../Components/PageWrapper/PageWrapper";
import { productsRoute, userRoute } from "../routes/routes";
import { ProductsSection } from "./Products/ProductsSection";
import { userStore } from "./userStore/user.zustand";

const Main: React.FC = () => {
    const queryUser = userStore((state) => state.queryUser);
    useEffect(() => {
        queryUser();
    }, []);
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
                <Route
                    path={`${userRoute}`}
                    element={<div>Witaj na swoim profilu</div>}
                />
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
