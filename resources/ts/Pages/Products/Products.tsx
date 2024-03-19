import React from "react";
import { Product, ProductProps } from "./Product/Product";

export const Products: React.FC = () => {
    const products = [
        {
            id: "10316-1",
            theme: "Lotr",
            setName: "Lord of the Rings: Rivendell",
            imgURL: "https://cdn.rebrickable.com/media/sets/10316-1/132394.jpg",
            pieces: 6181,
            price: 500,
        },
    ] as ProductProps[];

    return (
        <ul>
            {products.map(({ id, theme, setName, imgURL, pieces, price }) => (
                <Product
                    id={id}
                    key={id}
                    theme={theme}
                    price={price}
                    setName={setName}
                    imgURL={imgURL}
                    pieces={pieces}
                />
            ))}
        </ul>
    );
};
