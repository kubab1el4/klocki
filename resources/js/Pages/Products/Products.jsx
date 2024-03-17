import { Product } from "./Product/Product";

export function Products() {
    const products = [
        {
            id: 10316 - 1,
            theme: "Lotr",
            setName: "Lord of the Rings: Rivendell",
            imgURL: "https://cdn.rebrickable.com/media/sets/10316-1/132394.jpg",
            pieces: "6181",
            price: 500,
        },
    ];

    return (
        <ul>
            {products.map(({ id, theme, setName, imgURL, pieces, price }) => (
                <Product
                    id={id}
                    theme={theme}
                    price={price}
                    setName={setName}
                    imgURl={imgURL}
                    pieces={pieces}
                />
            ))}
        </ul>
    );
}
