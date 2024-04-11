import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Theme = {
    id: number;
    parent_name: string;
    parent_id: number;
    name: string;
};

export const ThemeSelector = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const scrollRef = React.useRef<HTMLUListElement>(null);
    const navigate = useNavigate();
    const { themeId } = useParams<{ themeId: string }>();

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

    const currentTheme = themes.find(
        (theme) => theme.id === (themeId && parseInt(themeId))
    );

    const onscroll = (offset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += offset;
        }
    };

    return (
        <div className="w-100vh h-20 bg-stone-900 text-white flex items-center gap-4 p-4 justify-center top-0 sticky z-[99]">
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
                {themes.map((theme: { id: number; name: string }) => {
                    const isActive = currentTheme?.id === theme.id;
                    return (
                        <li
                            key={theme.id}
                            className={clsx(
                                "p-2 cursor-pointer bg-stone-700 w-fit h-fit rounded-md transition-colors duration-300",
                                {
                                    "text-primary bg-white": isActive,
                                    "hover:bg-stone-800 hover:text-primary":
                                        !isActive,
                                }
                            )}
                            onClick={() => {
                                isActive
                                    ? navigate(`/products`)
                                    : navigate(`/products/${theme.id}`);
                            }}
                        >
                            {theme.name}
                        </li>
                    );
                })}
            </ul>
            <Button onClick={() => onscroll(900)} className="cursor-pointer">
                <ArrowForwardIos />
            </Button>
        </div>
    );
};
