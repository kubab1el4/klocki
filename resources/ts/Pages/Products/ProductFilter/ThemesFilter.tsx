import * as React from "react";
import { useIntl } from "react-intl";
import { FilterList } from "../../../Components/FilterList/FilterList";
import { useProducts } from "../../../hooks";
import { tProductFilterSidebar } from "./ProductFilterSidebar.t";

export const ThemesFilter: React.FC = () => {
    const intl = useIntl();
    const products = useProducts();

    return (
        <div>
            {products?.themes && (
                <FilterList
                    filterTitle={intl.formatMessage(
                        tProductFilterSidebar.themes
                    )}
                    searchParamKey="themeId"
                    options={products.themes.map(
                        ({ theme_id, number_of_appearances }) => ({
                            name: theme_id,
                            number_of_appearances,
                            id: theme_id,
                        })
                    )}
                />
            )}
        </div>
    );
};
