import { defineMessages } from "react-intl";

export const tProduct = defineMessages({
    ProductName: {
        id: "1a1f9ee8-14a3-4a49-bcc4-80b5eec4b2e3",
        defaultMessage: "Lego {theme} {setName} {setNumber}",
        description: "Header for the product",
    },
    AdditionalInfo: {
        id: "b7d9e9a1-2f4f-4b9f-8b2f-2b9f3c3e9f3a",
        defaultMessage: "{pieces} elementów ",
        description: "Price and pieces",
    },
    PriceForOnePiece: {
        id: "b7d9e9a1-2f4f-4b9f-8b2f-2b9f3c3e9f3a",
        defaultMessage: "Cena za 1 element {priceForOnePiece}zł",
        description: "Price for one piece",
    },
    Price: {
        id: "b7d9e9a1-2f4f-4b9f-8b2f-2b9f3c3e9f3a",
        defaultMessage: "Od: {price}",
        description: "Price",
    },
    ComparePricesInStores: {
        id: "b7d9e9a1-2f4f-4b9f-8b2f-2b9f3c3e9f3a",
        defaultMessage: "Porównaj ceny w {stores} sklepach",
        description: "Button to compare prices in stores",
    },
});
