import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { tProduct } from "./Product.t";
import { Box, Card, CardActionArea, CardContent } from "@mui/material";
import { NotificationAddOutlined } from "@mui/icons-material";
import { ProductPopover } from "./ProductPopover";

export type ProductProps = {
    id: string;
    setName: string;
    theme: string;
    pieces: number;
    price: number;
    imgURL: string;
};

export const Product: React.FC<ProductProps> = ({
    id,
    setName,
    theme,
    pieces,
    price,
    imgURL,
}) => {
    const setNumber = id.split("-")[0];
    const intl = useIntl();
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const handelPopoverButtonClick = () => {
        setIsPopoverOpen((prevState) => !prevState);
    };

    return (
        <li>
            <Card
                className="max-w-64 border-grey-300 border-2 border-solid m-4 relative"
                sx={{ boxShadow: "none", borderRadius: "0.375rem" }}
            >
                <CardContent className="p-4 group">
                    <button
                        ref={anchorRef}
                        className="absolute right-2 top-2 bg-white rounded-full p-2"
                        onClick={(e) => {
                            e.preventDefault();
                            handelPopoverButtonClick();
                        }}
                    >
                        <NotificationAddOutlined />
                    </button>
                    <ProductPopover
                        open={isPopoverOpen}
                        anchorEl={anchorRef.current}
                        handelClose={() => {
                            setIsPopoverOpen(false);
                        }}
                    />
                    <Box className="flex justify-center items-center w-full bg-gray-100 rounded-md">
                        <img
                            src={imgURL}
                            alt={`image of ${setName} Lego set`}
                            className="w-[80%] group-hover:scale-110  transition ease-in-out duration-300 p-3"
                        />
                    </Box>
                    <CardContent>
                        <h2 className="font-medium">
                            {intl.formatMessage(tProduct.ProductName, {
                                theme,
                                setNumber,
                                setName,
                            })}
                        </h2>
                        <div className="text-slate-600 text-sm">
                            <p>
                                {intl.formatMessage(tProduct.AdditionalInfo, {
                                    pieces,
                                })}
                            </p>
                            <p>
                                {" "}
                                {intl.formatMessage(tProduct.PriceForOnePiece, {
                                    priceForOnePiece: (price / pieces).toFixed(
                                        2
                                    ),
                                })}
                            </p>
                        </div>
                        <div className="mt-6">
                            <span className="font-semibold text-lg">
                                {intl.formatMessage(tProduct.Price, { price })}
                            </span>
                            <p className="text-slate-600">
                                {intl.formatMessage(
                                    tProduct.ComparePricesInStores,
                                    { stores: 5 }
                                )}
                            </p>
                        </div>
                    </CardContent>
                </CardContent>
            </Card>
        </li>
    );
};
