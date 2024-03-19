import { defineMessages } from "react-intl";

export const tProduct = defineMessages({
    ProductName: {
        id: "1a1f9ee8-14a3-4a49-bcc4-80b5eec4b2e3",
        defaultMessage: "Lego {theme} {setNumber} {setName}",
        description: "Header for the product",
    },
    Price: {
        id: "b7d9e9a1-2f4f-4b9f-8b2f-2b9f3c3e9f3a",
        defaultMessage:
            "{price}zł | {pieces} elementów | cena za 1 element {priceForOnePiece}",
        description: "Price and pieces",
    },
});
