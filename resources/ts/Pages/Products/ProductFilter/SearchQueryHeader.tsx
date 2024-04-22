import React, { FC } from "react";
import { useIntl } from "react-intl";
import { useSearchQueryContext } from "../../../../contex/searchQueryContex";
import { tSearchQueryHeader } from "./SearchQueryHeader.t";

export const SearchQueryHeader: FC = () => {
    const intl = useIntl();
    const { query } = useSearchQueryContext();
    console.log(query);

    return (
        <h2 className="tracking-wider text-2xl font-semibold">
            {intl.formatMessage(tSearchQueryHeader.headerText, {
                value: <span className="text-primary-400">{query}</span>,
            })}
        </h2>
    );
};
