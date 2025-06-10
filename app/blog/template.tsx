import type { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

export default function BlogListTemplate({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
