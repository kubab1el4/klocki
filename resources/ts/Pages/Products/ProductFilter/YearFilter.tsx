import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getQueryForThemes } from "../../../helpers/getQueryForThemes";
import { useDebounce } from "../../../hooks/useDebounce";
import { domain } from "../../../routes/routes";
import { tProductFilterSidebar } from "./ProductFilterSidebar.t";
import { SectionHeader } from "./SectionHeader";

function valuetext(value: number) {
    return `${value}°C`;
}

export const YearFilter: React.FC = () => {
    const intl = useIntl();
    const [minYear, setMinYear] = useState<number>(0);
    const [maxYear, setMaxYear] = useState<number>(0);
    const [value, setValue] = useState<number[]>([minYear, maxYear]);
    const [yearRangeParams, setYearRangeParams] = useSearchParams();

    const setDebounceYear = useDebounce(() => {
        yearRangeParams.set("year", (value as number[]).join(" "));
        setYearRangeParams(yearRangeParams);
    });

    const handleYearChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        setDebounceYear();
    };
    const { themeId } = useParams<{ themeId: string }>();
    const themesFiltersArray = getQueryForThemes(themeId);

    useEffect(() => {
        const fetchMaxAndMinYear = async () => {
            const responseMaxYear = await fetch(
                `${domain}/api/sets?${themesFiltersArray?.join(
                    "&"
                )}&sort=year:desc`
            );

            const responseMinYear = await fetch(
                `${domain}/api/sets?${themesFiltersArray?.join(
                    "&"
                )}&sort=year:asc`
            );

            const dataMinYear = await responseMinYear.json();
            const dataMaxYear = await responseMaxYear.json();
            setMaxYear(dataMaxYear.data[0].year);
            setMinYear(dataMinYear.data[0].year);
        };
        fetchMaxAndMinYear();
    }, [themeId]);

    useEffect(() => {
        setValue([minYear, maxYear]);
    }, [minYear, maxYear]);

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
                    min={minYear}
                    max={maxYear}
                />
            </Box>
        </div>
    );
};
