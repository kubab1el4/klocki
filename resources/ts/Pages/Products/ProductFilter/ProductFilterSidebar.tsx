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
    const [isLoading, setIsLoading] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        const fetchThemes = async () => {
            setThemes([]);
            setIsLoading(true);
            for (let i = 1; i <= currentPage; i++) {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_APP_URL
                    }/api/themes?filters[parent_id][$null]&page=${i}`
                );
                const data = await response.json();
                setThemes((prevdata) => [...prevdata, ...data.data]);
            }
            setIsLoading(false);
        };
        fetchThemes();
    }, [currentPage]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <h2 className="text-primary-400 text-lg">
                        {intl.formatMessage(tProductFilterSidebar.themes)}:
                    </h2>

                    <FormGroup className="flex flex-col ml-3">
                        {themes.map((theme: { id: number; name: string }) => (
                            <FormControlLabel
                                key={theme.id}
                                control={<Checkbox color="primary" />}
                                label={theme.name}
                            />
                        ))}
                        {themes.length > 10 && (
                            <Button
                                variant="text"
                                onClick={() => {
                                    setCurrentPage((prev) => --prev);
                                }}
                            >
                                <RemoveIcon /> Show less
                            </Button>
                        )}
                        <Button
                            variant="text"
                            onClick={() => setCurrentPage((prev) => ++prev)}
                        >
                            <AddIcon /> Show more
                        </Button>
                    </FormGroup>
                </>
            )}
        </div>
    );
};
