import React from "react";
import { SeriesFilter } from "./SeriesFilter";
import { YearFilter } from "./YearFilter";

export const ProductFilterSidebar: React.FC = () => {
    return (
        <>
            <YearFilter />
            <SeriesFilter />
        </>
    );
};
