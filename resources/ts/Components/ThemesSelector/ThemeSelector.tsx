import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

export const ThemeSelector = () => {
    const [themes, setThemes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_APP_URL}/api/themes?page=${page}`
            );
            const data = await response.json();
            setThemes(data.data);
        };
        fetchThemes();
    }, [page]);

    return (
        <div className="w-100vh bg-gray-900">
            <ul className="flex gap-4 h-24 overflow-x-hidden py-4 px-10 mx-auto w-fit items-center text-white">
                <ArrowBackIos
                    onClick={() => setPage((prev) => --prev)}
                    className="cursor-pointer"
                />
                {themes.map((theme: { id: number; name: string }) => (
                    <li
                        key={theme.id}
                        className="p-2 bg-gray-700  h-fit rounded-md"
                    >
                        {theme.name}
                    </li>
                ))}
                <ArrowForwardIos
                    onClick={() => setPage((prev) => ++prev)}
                    className="cursor-pointer"
                />
            </ul>
        </div>
    );
};
