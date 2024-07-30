import React from "react";
import { ElementsFiler } from "./ElementsFilter";
import { ThemesFilter } from "./ThemesFilter";
import { YearFilter } from "./YearFilter";

export const ProductFilterSidebar: React.FC = () => {
    return (
        <>
            <ElementsFiler />
            <ThemesFilter />
            <YearFilter />
        </>
    );
};
