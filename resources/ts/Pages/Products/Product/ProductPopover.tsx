import { ControlPoint, NotificationsNoneOutlined } from "@mui/icons-material";
import { Popover, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import { useIntl } from "react-intl";
import { tProductPopover } from "./ProductPopover.t";

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
                    <span className="text-gray-500">
                        <ControlPoint fontSize={"small"} />
                    </span>
                    {intl.formatMessage(tProductPopover.AddToWishlist)}
                </button>
                <button className="flex gap-2 w-full hover:bg-gray-100 p-2">
                    <span className="text-gray-500">
                        <NotificationsNoneOutlined fontSize={"small"} />
                    </span>
                    {intl.formatMessage(tProductPopover.PriceAlert)}
                </button>
            </div>
        </Popover>
    );
};
