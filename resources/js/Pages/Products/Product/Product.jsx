import { Link } from "@inertiajs/inertia-react";

export function Product({
    id,
    setName,
    theme,
    setNumber,
    pieces,
    price,
    imgURl,
}) {
    return (
        <li key={id}>
            <img src={imgURl} alt={`image of ${setName} Lego set`} />
            <div>
                <h2>
                    Lego {theme} {setNumber} {setName}
                </h2>
                <p>
                    {price} eułro | {pieces} pieces | price for piece{" "}
                    {+price / +pieces}
                </p>
            </div>
            <Link>Go to steal</Link>
        </li>
    );
}
