import { IntlProvider } from "react-intl";
import { Products } from "./Products/Products";
import React from "react";

const Main: React.FC = () => {
    return (
        <IntlProvider locale="pl" defaultLocale="pl">
            <Products />
        </IntlProvider>
    );
};

export default Main;
