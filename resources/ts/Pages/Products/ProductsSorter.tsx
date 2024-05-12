import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import React, { SetStateAction, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { tPRoducts } from "./Products.t";

export const ProductSorter = () => {
    const intl = useIntl();

    const [sort, setSort] = React.useState("");
    const [sortParams, setSortParams] = useSearchParams();

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
        sortParams.set("sort", event.target.value);
        setSortParams(sortParams);
    };

    const filterOptions = [
        { text: intl.formatMessage(tPRoducts.partsDesc), value: "pd" },
        { text: intl.formatMessage(tPRoducts.partAsc), value: "pa" },
        { text: intl.formatMessage(tPRoducts.yearDesc), value: "yd" },
        { text: intl.formatMessage(tPRoducts.yearAsc), value: "ya" },
    ];
    console.log(sortParams);

    useEffect(() => {
        setSort(sortParams.get("sort") as SetStateAction<string>);
        sortParams.set("page", "1");
    }, [sortParams]);

    return (
        <div className="w-full flex justify-end ">
            <div className="mr-4 grow-[0.15]">
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                        {intl.formatMessage(tPRoducts.sortPlaceholder)}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="sortwanie"
                        onChange={handleChange}
                    >
                        {filterOptions.map((option, i) => (
                            <MenuItem value={option.value} key={i}>
                                {option.text}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};
