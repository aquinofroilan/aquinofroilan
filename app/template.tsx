import { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

export default function TemplateTmp({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
