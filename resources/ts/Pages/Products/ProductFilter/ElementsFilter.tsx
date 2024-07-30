import * as React from "react";
import { useIntl } from "react-intl";
import { FilterList } from "../../../Components/FilterList/FilterList";
import { useProducts } from "../../../hooks";
import { tProductFilterSidebar } from "./ProductFilterSidebar.t";

const styles = { hoverStyle: "group-hover:text-primary-400 transition" };

export const ElementsFiler: React.FC = () => {
    const intl = useIntl();
    const products = useProducts();

    return (
        <>
            {products?.elements && (
                <FilterList
                    filterTitle={intl.formatMessage(
                        tProductFilterSidebar.ELementsHeader
                    )}
                    searchParamKey="elements"
                    options={products.elements.map(
                        ({ category, number_of_appearances }, i) => ({
                            number_of_appearances,
                            name: category,
                            id: category,
                        })
                    )}
                />
            )}
        </>
    );
};
