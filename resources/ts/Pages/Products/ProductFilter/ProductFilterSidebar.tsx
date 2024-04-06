import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router";
import { tProductFilterSidebar } from "./ProductFilterSidebar.t";

type Theme = {
    id: number;
    parent_name: string;
    parent_id: number;
    name: string;
};

export const ProductFilterSidebar = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDecrement, setIsDecrement] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const intl = useIntl();
    const { themeId } = useParams<{ themeId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThemes = async () => {
            setIsLoading(true);

            const response = await fetch(
                `${
                    import.meta.env.VITE_APP_URL
                }/api/themes?filters[parent_id][$null]&sort=name&page=${currentPage}`
            );
            const data = await response.json();
            setThemes((prevdata) => [...prevdata, ...data.data]);

            setIsLoading(false);
        };
        if (isDecrement) setThemes((prevData) => prevData.slice(0, -10));
        else {
            fetchThemes();
        }
    }, [currentPage]);

    return (
        <div>
            <>
                <h2 className="text-primary-400 text-lg sticky top-0 bg-white z-[9]">
                    {intl.formatMessage(tProductFilterSidebar.themes)}:
                </h2>

                <FormGroup className="flex flex-col ml-3">
                    {themes.map((theme: { id: number; name: string }) => (
                        <FormControlLabel
                            key={theme.id}
                            control={
                                <Checkbox
                                    color="primary"
                                    onClick={(e) => {
                                        const isChecked = (
                                            e.target as HTMLInputElement
                                        ).checked;
                                        if (isChecked) {
                                            themeId
                                                ? navigate(
                                                      `/products/${themeId}&${theme.id}`
                                                  )
                                                : navigate(
                                                      `/products/${theme.id}`
                                                  );
                                        } else {
                                            const themes = themeId?.split("&");
                                            const filteredThemes =
                                                themes?.filter(
                                                    (el) => +el !== theme.id
                                                );
                                            navigate(
                                                `/products/${filteredThemes?.join(
                                                    "&"
                                                )}`
                                            );
                                        }
                                    }}
                                />
                            }
                            label={theme.name}
                        />
                    ))}
                    {isLoading ? (
                        <CircularProgress className="mx-auto" size="16" />
                    ) : (
                        <div>
                            {themes.length > 10 && (
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        setIsDecrement(true);
                                        setCurrentPage((prev) => --prev);
                                    }}
                                >
                                    <RemoveIcon /> Show less
                                </Button>
                            )}
                            <Button
                                variant="text"
                                onClick={() => {
                                    setIsDecrement(false);
                                    setCurrentPage((prev) => ++prev);
                                }}
                            >
                                <AddIcon /> Show more
                            </Button>
                        </div>
                    )}
                </FormGroup>
            </>
        </div>
    );
};
