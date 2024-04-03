import { ControlPoint, NotificationsNoneOutlined } from "@mui/icons-material";
import { Popover, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { PricedropModal } from "./PriceDropModal/PricedropModal";
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
    const [openPricedropModal, setOpenPricedropModal] = useState(false);
    const handlePricedropModalOpen = () => setOpenPricedropModal(true);
    const handlePriceDropMocalClose = () => setOpenPricedropModal(false);

    const buttonOptions = [
        {
            text: intl.formatMessage(tProductPopover.AddToWishlist),
            icon: <ControlPoint fontSize={"small"} />,
        },
        {
            text: intl.formatMessage(tProductPopover.PriceAlert),
            icon: <NotificationsNoneOutlined fontSize={"small"} />,
            onClick: handlePricedropModalOpen,
        },
    ];

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
                {buttonOptions.map(({ text, icon, onClick }) => (
                    <button
                        onClick={onClick}
                        key={text}
                        className="flex gap-2 w-full hover:bg-gray-100 p-2"
                    >
                        <span className="text-gray-500">{icon}</span>
                        {text}
                    </button>
                ))}
            </div>
            <PricedropModal
                open={openPricedropModal}
                handleClose={handlePriceDropMocalClose}
            />
        </Popover>
    );
};
