import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getQueryForThemes } from "../../helpers/getQueryForThemes";
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
        searchParams.set("page", value.toString());
        setSearchParams(searchParams);
    };
    const { themeId } = useParams<{ themeId: string }>();
    const year = searchParams.get("year");
    const searchQuery = searchParams.get("search");
    const themesFiltersArray = getQueryForThemes(themeId);
    console.log(searchQuery);
    const years = year?.split(" ");
    const yearsFiltersString =
        years &&
        `&filters[year][$between][0]=${years[0]}&filters[year][$between][1]=${years[1]}`;

    const currentPage = searchParams.get("page");
    const [total, setTotal] = useState(0);
    const pages = Math.ceil(total / 16);
    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_APP_URL}/api/search/sets?${
                searchQuery ? `search=${searchQuery}&` : ""
            }${themesFiltersArray?.join(
                ","
            )}&sort=year:desc&${yearsFiltersString}&page=${currentPage}`
        );
        const data = await response.json();
        console.log(data);
        setTotal(data.total);
        setIsLoading(false);
        setProducts(data.data);
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, themeId, searchQuery]);

    useEffect(() => {
        const fetchProductTimeout = setTimeout(() => {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
            fetchProducts();
        }, 500);

        return () => clearTimeout(fetchProductTimeout);
    }, [year]);

    const products = productsData?.map(
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
