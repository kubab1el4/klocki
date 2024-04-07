import React, { ReactNode } from "react";

type SectionHeaderProps = {
    text: string | ReactNode;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ text }) => {
    return (
        <h2 className="text-primary-400 text-lg sticky top-0 bg-white z-[9]">
            {text}:
        </h2>
    );
};
