import React from "react";
import { ThemeSelector } from "../../Components/ThemesSelector/ThemeSelector";
import { ProductsDataProvider } from "../../hooks";
import { ProductFilterSidebar } from "./ProductFilter/ProductFilterSidebar";
import { SearchQueryHeader } from "./ProductFilter/SearchQueryHeader";
import { Products } from "./Products";
import { ProductSorter } from "./ProductsSorter";

export const ProductsSection: React.FC = () => {
    return (
        <ProductsDataProvider>
            <>
                <ThemeSelector />
                <div className="max-w-screen-xl mx-auto my-8 grid grid-cols-10 ">
                    <div className="col-span-10 overflow-y-scroll mb-6">
                        <SearchQueryHeader />
                    </div>
                    <div className="col-span-2 overflow-y-scroll">
                        <ProductFilterSidebar />
                    </div>
                    <div className="col-span-8">
                        <ProductSorter />
                        <Products />
                    </div>
                </div>
            </>
        </ProductsDataProvider>
    );
};
