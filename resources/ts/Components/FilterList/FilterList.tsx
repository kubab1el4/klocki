import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks";
import { tProductFilterSidebar } from "../../Pages/Products/ProductFilter/ProductFilterSidebar.t";
import { SectionHeader } from "../../Pages/Products/ProductFilter/SectionHeader";

const styles = { hoverStyle: "group-hover:text-primary-400 transition" };

type FilterListType = {
    searchParamKey: string;
    options: {
        name: string;
        number_of_appearances: number;
        id: string;
    }[];
    filterTitle?: string;
};

export const FilterList = ({
    searchParamKey,
    filterTitle,
    options,
}: FilterListType) => {
    const intl = useIntl();
    const products = useProducts();
    const [slice, setSlice] = useState<number>(10);
    const [searchParams, setSearchParams] = useSearchParams();
    const paramsArray = searchParams.get(searchParamKey)?.split("&");

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        optionId: string
    ) => {
        if (e.target.checked) {
            if (paramsArray && paramsArray.length >= 1) {
                searchParams.set(
                    searchParamKey,
                    [...paramsArray, optionId]?.join("&")
                );
                setSearchParams(searchParams);
            } else {
                searchParams.set(searchParamKey, optionId);
                setSearchParams(searchParams);
            }
        } else {
            if (paramsArray && paramsArray?.length > 1) {
                searchParams.set(
                    searchParamKey,
                    paramsArray
                        ?.filter((id) => {
                            console.log(typeof id);
                            console.log(typeof optionId);
                            return id !== optionId.toString();
                        })
                        .join("&")
                );
                setSearchParams(searchParams);
            } else {
                searchParams.set(searchParamKey, "");

                setSearchParams(searchParams);
            }
        }
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    };

    const optionsSliced = options.slice(0, slice);

    return (
        <div>
            <SectionHeader text={filterTitle} />
            <Box className="pt-4 pb-4 px-6">
                <FormGroup>
                    {optionsSliced?.map((option) => (
                        <FormControlLabel
                            className="group cursor-pointer"
                            label={
                                <>
                                    <span
                                        className={`text-gray-700 ${styles.hoverStyle}`}
                                    >
                                        {option.name}
                                    </span>
                                    <span
                                        className={`text-gray-500 ${styles.hoverStyle}`}
                                    >
                                        {" "}
                                        ({option.number_of_appearances})
                                    </span>
                                </>
                            }
                            control={
                                <Checkbox
                                    onChange={(e) => onChange(e, option.id)}
                                />
                            }
                        />
                    ))}
                </FormGroup>
                {optionsSliced && optionsSliced?.length > 10 && (
                    <Button
                        type="button"
                        variant="text"
                        onClick={() => setSlice((prevState) => prevState - 10)}
                    >
                        <RemoveIcon />
                        {intl.formatMessage(tProductFilterSidebar.showLess)}
                    </Button>
                )}
                {optionsSliced?.length !== options?.length && (
                    <Button
                        type="button"
                        variant="text"
                        onClick={() => setSlice((prevState) => prevState + 10)}
                    >
                        <AddIcon />
                        {intl.formatMessage(tProductFilterSidebar.showMore)}
                    </Button>
                )}
            </Box>
        </div>
    );
};
