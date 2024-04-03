import React from "react";
import { ThemeSelector } from "../../Components/ThemesSelector/ThemeSelector";
import { ProductFilterSidebar } from "./ProductFilter/ProductFilterSidebar";
import { Products } from "./Products";

export const ProductsSection = () => {
    return (
        <>
            <ThemeSelector />
            <div className="max-w-screen-xl mx-auto my-8 grid grid-cols-10">
                <div className="col-span-2 overflow-y-scroll h-[90vh]">
                    <ProductFilterSidebar />
                </div>
                <div className="col-span-8">
                    <Products />
                </div>
            </div>
        </>
    );
};
