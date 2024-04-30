import SearchIcon from "@mui/icons-material/Search";
import React, { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { productsRoute } from "../../routes/routes";

export const SearchForm = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [_, setSearchParams] = useSearchParams({});
    const navigate = useNavigate();
    const handelSearchSubmit = (e: FormEvent) => {
        navigate(`${productsRoute}`);
        e.preventDefault();
        if (inputRef.current?.value) {
            setSearchParams(`search=${inputRef.current?.value.toString()}`);
        }
    };
    return (
        <form
            className="w-96 text-white relative"
            onSubmit={handelSearchSubmit}
        >
            <input
                className="h-8 bg-primary-300 w-96 pl-4 pr-10 rounded-2xl outline-none"
                ref={inputRef}
            />
            <button type="submit" className="absolute right-2 h-full">
                <SearchIcon />
            </button>
        </form>
    );
};
