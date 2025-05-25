import { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

export default function Template({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
