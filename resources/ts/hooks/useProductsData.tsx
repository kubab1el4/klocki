import React, {
    FC,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getQuery } from "../helpers/getQuery";
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
    const themeIdParams = searchParams.get("themeId");
    const themesFiltersArray =
        getQuery("theme_id", themeIdParams || undefined) || [];
    const searchQuery = searchParams.get("search");
    const year = searchParams.get("year");
    const yearFilterArray = getQuery("year", year || undefined) || [];
    const currentPage = searchParams.get("page");
    const sort = searchParams.get("sort") as keyof typeof SortObject;

    const fetchQuerry = `${domain}/api/${searchQuery ? "search/" : ""}sets?${
        searchQuery ? `search=${searchQuery}&` : ""
    }${themesFiltersArray}&${yearFilterArray}&sort=${
        sort ? `${SortObject[sort]}` : "year:desc"
    }&page=${currentPage}`;

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
                const { elements, themes, yearsOfAppearance, meta } = data;
                setIsLoading(false);
                setMetaData({
                    meta,
                    elements: elements.reverse(),
                    themes,
                    yearsOfAppearance,
                });
            });
    }, [searchQuery]);

    return (
        <Contex.Provider
            value={{
                data: products,
                meta: metaData.meta,
                isLoading,
                elements: metaData.elements,
                themes: metaData.themes,
                yearsOfAppearance: metaData.yearsOfAppearance,
            }}
        >
            {children}
        </Contex.Provider>
    );
};

export const useProducts = () => useContext(Contex);
