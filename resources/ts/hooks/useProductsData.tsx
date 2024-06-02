import React, {
    FC,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getQueryForThemes } from "../helpers/getQueryForThemes";
import { domain } from "../routes/routes";
type ProductsDataProviderProps = {
    children: ReactElement;
};
type ProductType = {
    id: number;
    set_num: string;
    name: string;
    year: number;
    theme_id: number;
    theme_name: string;
    num_parts: number;
    catalog_price: string;
};

type metaDataType = {
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
    };
    isLoading?: boolean;
    elements?: { category: string; number_of_appearances: number }[];
    themes?: { theme_id: string; number_of_appearances: number }[];
    yearsOfAppearance?: {
        year: string;
        number_of_appearances: number;
    }[];
};

type ProductsType = {
    data?: ProductType[];
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
    };
    isLoading?: boolean;
    elements?: { category: string; number_of_appearances: number }[];
    themes?: { theme_id: string; number_of_appearances: number }[];
    yearsOfAppearance?: {
        year: string;
        number_of_appearances: number;
    }[];
} | null;

enum SortObject {
    yd = "year:desc",
    ya = "year:asc",
    pa = "num_parts:asc",
    pd = "num_parts:desc",
}

const Contex = React.createContext<ProductsType>(null);

export const ProductsDataProvider: FC<ProductsDataProviderProps> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [metaData, setMetaData] = useState<metaDataType>({});
    const [products, setProducts] = useState<ProductType[] | undefined>(
        undefined
    );
    const { themeId } = useParams<{ themeId: string }>();

    const [searchParams] = useSearchParams({});
    const themesFiltersArray = getQueryForThemes(themeId);
    const searchQuery = searchParams.get("search");
    const year = searchParams.get("year");
    const currentPage = searchParams.get("page");
    const sort = searchParams.get("sort") as keyof typeof SortObject;

    const years = year?.split(" ");
    const yearsFiltersString =
        years &&
        `&filters[year][$between][0]=${years[0]}&filters[year][$between][1]=${years[1]}`;

    const fetchQuerry = `${domain}/api/${searchQuery ? "search/" : ""}sets?${
        searchQuery ? `search=${searchQuery}&` : ""
    }${themesFiltersArray?.join("&")}&sort=${
        sort ? `${SortObject[sort]}` : "year:desc"
    }&${yearsFiltersString}&page=${currentPage}`;

    useEffect(() => {
        setIsLoading(true);

        fetch(fetchQuerry)
            .then((data) => data.json())
            .then((data) => {
                setIsLoading(false);
                setProducts(data.data);
                setMetaData((prevState) => ({ ...prevState, meta: data.meta }));
            });
    }, [fetchQuerry]);

    useEffect(() => {
        setIsLoading(true);

        fetch(fetchQuerry)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);

                const { elements, themes, yearsOfAppearance, meta } = data;
                setIsLoading(false);
                setMetaData({
                    meta,
                    elements,
                    themes,
                    yearsOfAppearance,
                });
            });
    }, [searchQuery, themeId]);

    return (
        <Contex.Provider
            value={{
                data: products,
                meta: metaData.meta,
                isLoading,
                max_elements: metaData.max_elements,
                min_elements: metaData.min_elements,
                max_year: metaData.max_year,
                min_year: metaData.min_year,
                theme_ids: metaData.theme_ids,
            }}
        >
            {children}
        </Contex.Provider>
    );
};

export const useProducts = () => useContext(Contex);
