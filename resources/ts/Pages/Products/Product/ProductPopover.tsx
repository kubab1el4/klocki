import React, { RefObject } from "react";
import { Popover } from "@mui/material";
import { ControlPoint, NotificationsNoneOutlined } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { tProductPopover } from "./ProductPopover.t";
type ProductPopoverProps = {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    handelClose: () => void;
};

export const ProductPopover: React.FC<ProductPopoverProps> = ({
    open,
    anchorEl,
    handelClose,
}) => {
    const intl = useIntl();

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: 2,
                horizontal: "left",
            }}
            onClose={handelClose}
        >
            <div className="flex flex-col items-start gap-1 text-sm">
                <button className="flex gap-2 w-full hover:bg-gray-100 p-1">
                    <ControlPoint fontSize={"small"} />
                    {intl.formatMessage(tProductPopover.AddToWishlist)}
                </button>
                <button className="flex gap-2 w-full hover:bg-gray-100 p-1">
                    <NotificationsNoneOutlined fontSize={"small"} />
                    {intl.formatMessage(tProductPopover.PriceAlert)}
                </button>
            </div>
        </Popover>
    );
};
