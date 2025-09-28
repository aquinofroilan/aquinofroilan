import type { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

export default function ProjectTemplate({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
