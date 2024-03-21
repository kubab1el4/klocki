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
            <div className="flex flex-col items-start p-1 gap-1 text-sm">
                <button className="flex gap-2 w-full">
                    <ControlPoint />
                    {intl.formatMessage(tProductPopover.AddToWishlist)}
                </button>
                <button className="flex gap-2 w-full">
                    <NotificationsNoneOutlined />
                    {intl.formatMessage(tProductPopover.PriceAlert)}
                </button>
            </div>
        </Popover>
    );
};
