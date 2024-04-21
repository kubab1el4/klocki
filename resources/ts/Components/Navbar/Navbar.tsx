import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import React, { FormEvent, useRef } from "react";
import { useIntl } from "react-intl";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useSearchQueryContext } from "../../../contex/searchQueryContex";
import { tNavbar } from "./navbar.t";

export const Navbar = () => {
    const intl = useIntl();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams({});
    const { setQuery } = useSearchQueryContext();
    const linksOptions = [
        {
            text: intl.formatMessage(tNavbar.products),
            linkTo: "/products",
        },
        {
            text: intl.formatMessage(tNavbar.stealZone),
            linkTo: "/deals",
        },
    ];

    const handelSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            //searchParams.set("search", inputRef.current?.value.toString());
            setSearchParams(`search=${inputRef.current?.value.toString()}`);
            setQuery(inputRef.current?.value);
        }
    };

    return (
        <nav className="h-16 bg-primary sticky top-0 z-40 flex items-center text-white justify-around">
            <div className="flex gap-8 items-center font-semibold">
                <Link to="/">
                    <h2 className="hover:text-primary-900 cursor-pointer tracking-wide flex transition  items-center text-lg">
                        <AttachMoneyIcon />
                        {intl.formatMessage(tNavbar.companyName).toUpperCase()}
                    </h2>
                </Link>

                <ul className="flex gap-4">
                    {linksOptions.map((link, i) => (
                        <li key={i}>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary-900 underline underline-offset-8"
                                        : "hover:text-primary-900 transition duration-300"
                                }
                                to={link.linkTo}
                            >
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-6">
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
                <button className="w-68 text-sm flex gap-2 bg-primary-400 px-4 py-2 h-8 items-center rounded-2xl hover:bg-primary-200 hover:text-primary transition">
                    <span>{intl.formatMessage(tNavbar.loginSinginButton)}</span>
                    <PersonIcon />
                </button>
            </div>
        </nav>
    );
};
