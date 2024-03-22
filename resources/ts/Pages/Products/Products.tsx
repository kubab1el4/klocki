import React, { useEffect } from "react";
import { Product, ProductProps } from "./Product/Product";
type productsData = {
    id: number;
    name: string;
    num_parts: number;
    theme_id: number;
    year: number;
    set_img_url: string;
    set_num: string;
}[];

export const Products: React.FC = () => {
    const [productsData, setProducts] = React.useState<productsData>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/sets");
            const data = await response.json();
            setProducts(data.data);
        };
        fetchProducts();
    }, []);

    const products = productsData.map(
        ({ id, name, num_parts, theme_id, year, set_img_url, set_num }) => ({
            id: id,
            setName: name,
            theme: `${theme_id}`,
            pieces: num_parts,
            price: 500,
            imgURL: set_img_url,
            setNumber: set_num,
        })
    ) as ProductProps[];

    return (
        <ul className="m-auto w-fit grid grid-cols-3">
            {products.map(
                ({ id, theme, setName, imgURL, pieces, price, setNumber }) => (
                    <Product
                        id={id}
                        setNumber={setNumber}
                        key={id}
                        theme={theme}
                        price={price}
                        setName={setName}
                        imgURL={imgURL}
                        pieces={pieces}
                    />
                )
            )}
        </ul>
    );
};
