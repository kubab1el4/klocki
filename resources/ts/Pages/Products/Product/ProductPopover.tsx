import React from "react";
import { Popover, SvgIconTypeMap } from "@mui/material";
import { ControlPoint, NotificationsNoneOutlined } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { tProductPopover } from "./ProductPopover.t";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type PopoverOptionProps = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    text: string;
    onClick?: () => void;
};

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
                vertical: -4,
                horizontal: "left",
            }}
            onClose={handelClose}
        >
            <div className="flex flex-col items-start gap-1 text-sm">
                <button className="flex gap-2 w-full hover:bg-gray-100 p-2">
                    <ControlPoint fontSize={"small"} />
                    {intl.formatMessage(tProductPopover.AddToWishlist)}
                </button>
                <button className="flex gap-2 w-full hover:bg-gray-100 p-2">
                    <NotificationsNoneOutlined fontSize={"small"} />
                    {intl.formatMessage(tProductPopover.PriceAlert)}
                </button>
            </div>
        </Popover>
    );
};
