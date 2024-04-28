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

export const useFetch = (query: string, debounce?: number): FetchHook => {
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
            } catch (e: any) {
                setData({ data: [], total: 0 });
                setErrorMessage(e.errorMessage);
                console.error(e);
            }
        };
        const fetchProductsTimeout = setTimeout(() => {
            fetchProducts();
        }, debounce);
        console.log(data);

        return () => clearTimeout(fetchProductsTimeout);
    }, [query]);

    return {
        isLoading,
        data,
        errorMessage,
    };
};
