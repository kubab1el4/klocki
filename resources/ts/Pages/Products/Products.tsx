import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks";
import { Product, ProductProps } from "./Product/Product";
import { tPRoducts } from "./Products.t";

export const Products: React.FC = () => {
    const productsData = useProducts();
    const intl = useIntl();
    const [searchParams, setSearchParams] = useSearchParams({});
    const handelPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set("page", value.toString());
        setSearchParams(searchParams);
    };

    const currentPage = searchParams.get("page");

    const pages = productsData?.meta?.last_page
        ? productsData.meta.last_page
        : 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const products = productsData?.data?.map(
        ({
            id,
            name,
            num_parts,
            year,
            set_num,
            catalog_price,
            theme_name,
        }) => ({
            id: id,
            setName: name,
            pieces: num_parts,
            setNumber: set_num,
            catalogPrice: catalog_price,
            themeName: theme_name,
            year: year,
        })
    ) as ProductProps[];

    if (!productsData?.data || productsData?.isLoading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <CircularProgress color="primary" />
            </div>
        );

    return (
        <>
            {products.length > 0 ? (
                <>
                    <ul className="grid grid-cols-4">
                        {products?.map(
                            ({
                                id,
                                setName,
                                imgURL,
                                pieces,
                                setNumber,
                                catalogPrice,
                                themeName,
                                year,
                            }) => (
                                <Product
                                    id={id}
                                    setNumber={setNumber}
                                    key={id}
                                    setName={setName}
                                    imgURL={imgURL}
                                    pieces={pieces}
                                    catalogPrice={catalogPrice}
                                    themeName={themeName}
                                    year={year}
                                />
                            )
                        )}
                    </ul>
                </>
            ) : (
                <div className="text-2xl w-full h-full flex items-center flex-col text-primary font-700 pt-12">
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                    <p>{intl.formatMessage(tPRoducts.nothingFind)}</p>
                </div>
            )}
            {pages > 1 && (
                <Pagination
                    count={pages}
                    color="primary"
                    onChange={handelPageChange}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 4,
                    }}
                    size="large"
                    siblingCount={2}
                    page={currentPage ? +currentPage : 1}
                />
            )}
        </>
    );
};
