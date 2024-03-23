import React, { useEffect } from "react";
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
    const [productsData, setProducts] = React.useState<productsData>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_APP_URL}/api/sets?page=990`
            );
            const data = await response.json();
            setProducts(data.data);
        };
        fetchProducts();
    }, []);

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
        <ul className="m-auto w-fit grid grid-cols-3">
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
    );
};
