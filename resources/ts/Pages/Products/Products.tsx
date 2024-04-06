import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Product, ProductProps } from "./Product/Product";

type productsData = {
    id: number;
    name: string;
    num_parts: number;
    year: number;
    set_img_url: string;
    set_num: string;
    catalog_price: string | null;
    theme_name: string;
}[];

export const Products: React.FC = () => {
    const [productsData, setProducts] = useState<productsData>([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const [isLoading, setIsLoading] = useState(false);
    const handelPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setSearchParams({ page: value.toString() });
    };
    const { themeId } = useParams<{ themeId: string }>();
    const themesArray = themeId?.split("&");
    const themesFiltersArray = themesArray?.map(
        (themeId, i) => `filters[$or][${i}][theme_id][$eq]=${themeId}`
    );
    console.log(themesFiltersArray);

    const currentPage = searchParams.get("page");
    const [total, setTotal] = useState(0);
    const pages = Math.ceil(total / 16);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const response = themeId
                ? await fetch(
                      `${
                          import.meta.env.VITE_APP_URL
                      }/api/sets?${themesFiltersArray?.join(
                          "&"
                      )}&sort=year:desc&page=${currentPage}`
                  )
                : await fetch(
                      `${
                          import.meta.env.VITE_APP_URL
                      }/api/sets?sort=year:desc&page=${currentPage}`
                  );
            const data = await response.json();
            setTotal(data.meta.total);
            setIsLoading(false);
            setProducts(data.data);
        };
        fetchProducts();
    }, [currentPage, themeId]);

    const products = productsData.map(
        ({
            id,
            name,
            num_parts,
            year,
            set_img_url,
            set_num,
            catalog_price,
            theme_name,
        }) => ({
            id: id,
            setName: name,
            pieces: num_parts,
            imgURL: set_img_url,
            setNumber: set_num,
            catalogPrice: catalog_price,
            themeName: theme_name,
            year: year,
        })
    ) as ProductProps[];

    return (
        <>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <ul className="grid grid-cols-4">
                    {products.map(
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
