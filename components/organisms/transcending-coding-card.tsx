import React from "react";
import { BentoGridItem } from "../ui";

const TrascendingCodeCard = ({ className }: { className?: string }) => {
    return (
        <BentoGridItem
            className={className}
            icon={<h1 className="text-lg">👨‍💻</h1>}
            title="Transcending Code"
            description="A personal blog where I share my thoughts and experiences in coding, technology, and life."
        />
    );
};

export default TrascendingCodeCard;
