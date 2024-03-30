import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ThemeSelector = () => {
    const [themes, setThemes] = useState([]);
    const scrollRef = React.useRef<HTMLUListElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_APP_URL}/api/themes`
            );
            const data = await response.json();
            setThemes(data.data);
        };
        fetchThemes();
    }, []);

    const onscroll = (offset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += offset;
        }
    };

    return (
        <div className="w-100vh h-20 bg-stone-900 text-white flex items-center gap-4 p-4 justify-center">
            <Button
                onClick={() => onscroll(-900)}
                className="cursor-pointer flex items-end justify-center"
                color="primary"
            >
                <ArrowBackIos />
            </Button>
            <ul
                className="flex gap-4 text-sm overflow-x-auto no-scrollbar whitespace-nowrap max-w-5xl items-center scroll scroll-smooth"
                ref={scrollRef}
            >
                {themes.map((theme: { id: number; name: string }) => (
                    <li
                        key={theme.id}
                        className="p-2 cursor-pointer bg-stone-700 w-fit h-fit rounded-md hover:bg-stone-800 hover:text-primary transition-colors duration-300"
                        onClick={() => navigate(`/products/${theme.id}`)}
                    >
                        {theme.name}
                    </li>
                ))}
            </ul>
            <Button onClick={() => onscroll(900)} className="cursor-pointer">
                <ArrowForwardIos />
            </Button>
        </div>
    );
};
