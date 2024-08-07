import * as React from "react";
import { useIntl } from "react-intl";
import { FilterList } from "../../../Components/FilterList/FilterList";
import { useProducts } from "../../../hooks";
import { tProductFilterSidebar } from "./ProductFilterSidebar.t";

export const YearFilter: React.FC = () => {
    const intl = useIntl();
    const products = useProducts();

    return (
        <>
            {products?.yearsOfAppearance && (
                <FilterList
                    filterTitle={intl.formatMessage(
                        tProductFilterSidebar.YearHeader
                    )}
                    searchParamKey="year"
                    options={products.yearsOfAppearance.map(
                        ({ year, number_of_appearances }) => ({
                            name: year,
                            number_of_appearances,
                            id: year,
                        })
                    )}
                />
            )}
        </>
    );
};
