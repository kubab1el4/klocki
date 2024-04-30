import React, { FC } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { tSearchQueryHeader } from "./SearchQueryHeader.t";

export const SearchQueryHeader: FC = () => {
    const intl = useIntl();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search");

    return (
        query && (
            <h2 className="tracking-wider text-2xl font-semibold">
                {intl.formatMessage(tSearchQueryHeader.headerText, {
                    value: (
                        <span className="text-primary-400">
                            {searchParams.get("search")}
                        </span>
                    ),
                })}
            </h2>
        )
    );
};
