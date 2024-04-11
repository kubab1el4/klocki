import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ThemeSelector } from "../../Components/ThemesSelector/ThemeSelector";
import { ProductFilterSidebar } from "./ProductFilter/ProductFilterSidebar";
import { Products } from "./Products";

export const ProductsSection: React.FC = () => {
    return (
        <>
            <Navbar />
            <ThemeSelector />
            <div className="max-w-screen-xl mx-auto my-8 grid grid-cols-10 ">
                <div className="col-span-2 overflow-y-scroll">
                    <ProductFilterSidebar />
                </div>
                <div className="col-span-8">
                    <Products />
                </div>
            </div>
        </>
    );
};
