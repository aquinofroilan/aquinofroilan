import type { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

export default function BlogTemplate({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
