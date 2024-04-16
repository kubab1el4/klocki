import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const linksOptions = [
        {
            text: "Produkty",
            linkTo: "/products",
        },
    ];

    return (
        <nav className="h-16 bg-primary sticky top-0 z-40 flex items-center text-white px-24 justify-between">
            <div className="flex gap-8 items-center">
                <Link to="/">
                    <h2 className="hover:text-primary-200 cursor-pointer tracking-wide flex items-center text-xl">
                        <AttachMoneyIcon />
                        KLOCKI W REKLAMOWCE
                    </h2>
                </Link>

                <ul>
                    {linksOptions.map((link, i) => (
                        <li key={i}>
                            <Link to={link.linkTo}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <form>
                <input />
            </form>
            <div>
                <PersonIcon />
            </div>
        </nav>
    );
};
