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

type ProductsType = {
    data?: ProductType[];
    meta?: {
        current_page: number;
        from: number;
        last_page: number;
    };
    isLoading?: boolean;
    max_year?: number;
    min_year?: number;
    max_elements?: number;
    min_elements?: number;
    theme_ids?: number[];
    searchQuery: string | null;
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
    const [products, setProducts] = useState<ProductsType>(null);
    const { themeId } = useParams<{ themeId: string }>();

    const [searchParams] = useSearchParams({});
    const themesFiltersArray = getQueryForThemes(themeId);
    const searchQuery = searchParams.get("search");
    const year = searchParams.get("year");
    const currentPage = searchParams.get("page");
    const sort = searchParams.get("sort") as keyof typeof SortObject;
    console.log(sort);

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
                setProducts(data);
            });
    }, [fetchQuerry]);

    return (
        <Contex.Provider value={{ ...products, isLoading, searchQuery }}>
            {children}
        </Contex.Provider>
    );
};

export const useProducts = () => useContext(Contex);
