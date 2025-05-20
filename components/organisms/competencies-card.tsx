import React from "react";
import { BentoGridItem } from "@/components/ui";

const CompentenciesCard = ({ className }: { className?: string }) => {
    return (
        <BentoGridItem
            className={className}
            icon={<h1 className="text-lg">💪</h1>}
            title="Competencies"
            description="A list of my competencies and skills that I have acquired over the years."
        />
    );
};

export default CompentenciesCard;
