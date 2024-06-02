import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React from "react";
import { useIntl } from "react-intl";
import { Link, NavLink } from "react-router-dom";
import { LoginButton } from "../../Pages/UserAuth/LoginButton";
import { productsRoute } from "../../routes/routes";
import { tNavbar } from "./navbar.t";
import { SearchForm } from "./SearcchForm";

export const Navbar = () => {
    const intl = useIntl();
    const linksOptions = [
        {
            text: intl.formatMessage(tNavbar.products),
            linkTo: `${productsRoute}`,
        },
        {
            text: intl.formatMessage(tNavbar.stealZone),
            linkTo: "/deals",
        },
    ];

    return (
        <>
            <nav className="h-16 bg-primary sticky top-0 z-40 flex items-center text-white justify-around">
                <div className="flex gap-8 items-center font-semibold">
                    <Link to="/">
                        <h2 className="hover:text-primary-900 cursor-pointer tracking-wide flex transition  items-center text-lg">
                            <AttachMoneyIcon />
                            {intl
                                .formatMessage(tNavbar.companyName)
                                .toUpperCase()}
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
                    <SearchForm />
                    <LoginButton />
                </div>
            </nav>
        </>
    );
};
