import {
    ImageNotSupported,
    NotificationAddOutlined,
} from "@mui/icons-material";
import { Box, Card, CardContent } from "@mui/material";
import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tProduct } from "./Product.t";
import { ProductPopover } from "./ProductPopover";

export type ProductProps = {
    setName: string;
    pieces: number;
    price: number;
    imgURL: string | null;
    setNumber: string;
    id: number;
    catalogPrice: string | null;
    themeName: string;
    year: number;
};

export const Product: React.FC<ProductProps> = ({
    setName,
    pieces,
    price,
    imgURL,
    setNumber,
    catalogPrice,
    themeName,
    year,
}) => {
    const intl = useIntl();
    const setNumberAltered =
        setNumber.split("-")[1] === "1" ? setNumber.split("-")[0] : setNumber;
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const handelPopoverButtonClick = () => {
        setIsPopoverOpen((prevState) => !prevState);
    };
    const catalogPriceAltered = catalogPrice
        ? `${catalogPrice.slice(2)} zł`
        : "-";

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
                        className="absolute text-gray-500 z-[2] right-2 top-2 bg-white rounded-full p-2 hover:bg-gray-200 hover:text-gray-700 transition ease-in-out duration-300"
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
                        {imgURL ? (
                            <LazyLoadImage
                                src={`http://127.0.0.1:8000/api/thumbnail/${setNumber}`}
                                alt={`image of ${setName} Lego set`}
                                className="max-w-[100%] max-h-[100%] group-hover:scale-110  transition ease-in-out duration-300 p-3"
                            />
                        ) : (
                            <ImageNotSupported />
                        )}
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
                                <p>
                                    {intl.formatMessage(tProduct.CatalogPrice, {
                                        catalogPrice: catalogPriceAltered,
                                    })}
                                </p>
                                <p>
                                    {intl.formatMessage(tProduct.Year, {
                                        year,
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <Box className="p-4 absolute bottom-0 mb-4">
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
                    </Box>
                </CardContent>
            </Card>
        </li>
    );
};
