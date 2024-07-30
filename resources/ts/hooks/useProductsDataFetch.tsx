import { useEffect, useState } from "react";
type Data = {
    data: [];
    total?: number;
    meta?: { last_page: number };
};

export type FetchHook = {
    isLoading: boolean;
    data: Data;
    errorMessage: string;
};

export const useProductsDataFetch = (
    query: string,
    debounce?: number
): FetchHook => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data>({ data: [], total: 0 });
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(query);
                const data = await response.json();
                setData(data);
                setIsLoading(false);
            } catch (e) {
                if (e instanceof Error) {
                    setData({ data: [], total: 0 });
                    setErrorMessage(e.message);
                    console.error(e);
                }
            }
        };
        const fetchProductsTimeout = setTimeout(() => {
            fetchProducts();
        }, debounce);

        return () => clearTimeout(fetchProductsTimeout);
    }, [query]);

    return {
        isLoading,
        data,
        errorMessage,
    };
};
