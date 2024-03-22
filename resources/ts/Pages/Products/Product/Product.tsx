import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { tProduct } from "./Product.t";
import { Box, Card, CardContent } from "@mui/material";
import { NotificationAddOutlined } from "@mui/icons-material";
import { ProductPopover } from "./ProductPopover";

export type ProductProps = {
    setName: string;
    theme: string;
    pieces: number;
    price: number;
    imgURL: string;
    setNumber: string;
    id: number;
};

export const Product: React.FC<ProductProps> = ({
    setName,
    theme,
    pieces,
    price,
    imgURL,
    setNumber,
}) => {
    const intl = useIntl();
    const setNumberAltered =
        setNumber.split("-")[1] === "1" ? setNumber.split("-")[0] : setNumber;
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const handelPopoverButtonClick = () => {
        setIsPopoverOpen((prevState) => !prevState);
    };
    const [themeName, setThemeName] = React.useState("");

    useEffect(() => {
        const getThemeName = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/api/theme/${theme}`
            );
            const data = await response.json();
            setThemeName(data.data.name);
        };
        getThemeName();
    }, []);

    return (
        <li>
            <Card
                className="max-w-64 border-grey-300 m-4 relative cursor-pointer"
                sx={{
                    borderRadius: "0.375rem",
                    height: 450,
                }}
            >
                <CardContent className="p-4 group">
                    <button
                        ref={anchorRef}
                        className="absolute z-[2] right-2 top-2 bg-white rounded-full p-2 hover:bg-gray-200  transition ease-in-out duration-300"
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
                    <Box className="flex justify-center h-36 items-center bg-gray-100 rounded-md">
                        <img
                            src={imgURL}
                            alt={`image of ${setName} Lego set`}
                            className="max-w-[100%] max-h-[100%] group-hover:scale-110  transition ease-in-out duration-300 p-3"
                        />
                    </Box>
                    <CardContent>
                        <div>
                            <h2 className="font-medium hover:text-primary">
                                {intl.formatMessage(tProduct.ProductName, {
                                    theme: themeName,
                                    setNumber: setNumberAltered,
                                    setName,
                                })}
                            </h2>
                            <div className="text-slate-600 text-sm">
                                <p>
                                    {intl.formatMessage(
                                        tProduct.AdditionalInfo,
                                        {
                                            pieces,
                                        }
                                    )}
                                </p>
                                <p>
                                    {intl.formatMessage(
                                        tProduct.PriceForOnePiece,
                                        {
                                            priceForOnePiece: (
                                                price / pieces
                                            ).toFixed(2),
                                        }
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-4 absolute bottom-0 mb-4">
                        <span className="font-semibold text-lg">
                            {intl.formatMessage(tProduct.Price, {
                                price: (
                                    <span className="text-primary">
                                        {price} zł
                                    </span>
                                ),
                            })}
                        </span>
                        <p className="text-slate-600">
                            {intl.formatMessage(
                                tProduct.ComparePricesInStores,
                                { stores: 5 }
                            )}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
};
