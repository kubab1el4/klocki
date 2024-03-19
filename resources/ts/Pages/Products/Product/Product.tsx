import React from "react";
import { useIntl } from "react-intl";
import { tProduct } from "./Product.t";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";

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
    const intl = useIntl();
    return (
        <li>
            <Card className="mx-auto max-w-[700px] flex gap-[20px] mt-[40px]">
                <Box
                    sx={{ height: 200, width: 300 }}
                    className="flex justify-center align-center"
                >
                    <CardMedia
                        image={imgURL}
                        title={`image of ${setName} Lego set`}
                        sx={{ height: 150, width: 200 }}
                    />
                </Box>
                <CardContent>
                    <h2>
                        {intl.formatMessage(tProduct.ProductName, {
                            theme,
                            setNumber: id,
                            setName,
                        })}
                    </h2>
                    <p>
                        {intl.formatMessage(tProduct.Price, {
                            price,
                            pieces,
                            priceForOnePiece: (price / pieces).toFixed(2),
                        })}
                    </p>
                    <CardActions>
                        <Button variant="contained">Idz do okazji</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </li>
    );
};
