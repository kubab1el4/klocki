import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../hooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { tProductFilterSidebar } from "./ProductFilterSidebar.t";
import { SectionHeader } from "./SectionHeader";

function valuetext(value: number) {
    return `${value}°C`;
}

export const YearFilter: React.FC = () => {
    const intl = useIntl();
    const products = useProducts();

    const [value, setValue] = useState<number[]>([0, 0]);
    const [yearRangeParams, setYearRangeParams] = useSearchParams();

    const setDebounceYear = useDebounce(() => {
        yearRangeParams.set("year", (value as number[]).join(" "));
        yearRangeParams.set("page", "1");
        setYearRangeParams(yearRangeParams);
    });

    const handleYearChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        setDebounceYear();
    };

    useEffect(() => {
        setValue([products?.min_year || 0, products?.max_year || 0]);
    }, [products?.min_year, products?.max_year]);

    return (
        <div>
            <SectionHeader
                text={intl.formatMessage(tProductFilterSidebar.YearHeader)}
            />
            <Box className="pt-8 pb-4 px-6">
                <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleYearChange}
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                    min={products?.min_year}
                    max={products?.max_year}
                    disabled={
                        (products?.max_year === 0 &&
                            products?.min_year === 0) ||
                        products?.isLoading ||
                        products?.data?.length === 0
                    }
                />
            </Box>
        </div>
    );
};
