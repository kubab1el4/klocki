import { createContext, useContext } from "react";

export type SearchQueryContextType = {
    query: string;
    setQuery: (prevVal: string) => void;
};

export const SearchQueryContext = createContext<SearchQueryContextType>({
    query: "",
    setQuery: () => {},
});

export const useSearchQueryContext = () => useContext(SearchQueryContext);
