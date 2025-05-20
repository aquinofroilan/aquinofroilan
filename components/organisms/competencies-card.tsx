import React from "react";
import { BentoGridItem } from "@/components/ui";

const CompentenciesCard = ({ className }: { className?: string }) => {
    return (
        <BentoGridItem
            className={className}
            icon={<span className="text-2xl">💪</span>}
            title="Competencies"
            description="A list of my competencies and skills that I have acquired over the years."
        />
    );
};

export default CompentenciesCard;
