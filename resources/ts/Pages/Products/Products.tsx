import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ThemeSelector } from "../../Components/ThemesSelector/ThemeSelector";
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
    const currentPage = searchParams.get("page");

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const response = themeId
                ? await fetch(
                      `${
                          import.meta.env.VITE_APP_URL
                      }/api/theme/${themeId}/sets`
                  )
                : await fetch(
                      `${
                          import.meta.env.VITE_APP_URL
                      }/api/sets?page=${currentPage}`
                  );
            const data = await response.json();
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
            price: 500,
            imgURL: set_img_url,
            setNumber: set_num,
            catalogPrice: catalog_price,
            themeName: theme_name,
            year: year,
        })
    ) as ProductProps[];

    return (
        <>
            <ThemeSelector />
            <div className="mx-auto w-fit my-8">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <ul className="grid grid-cols-3">
                        {products.map(
                            ({
                                id,
                                setName,
                                imgURL,
                                pieces,
                                price,
                                setNumber,
                                catalogPrice,
                                themeName,
                                year,
                            }) => (
                                <Product
                                    id={id}
                                    setNumber={setNumber}
                                    key={id}
                                    price={price}
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
                <Pagination
                    count={1119}
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
            </div>
        </>
    );
};
