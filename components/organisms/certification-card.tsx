import { BadgeCheckIcon } from "lucide-react";
import { BentoGridItem } from "@/components/ui";

function CertificationCard() {
    return <BentoGridItem icon={<BadgeCheckIcon size={25} />} title={<h1>Certifications</h1>} />;
}

export default CertificationCard;
