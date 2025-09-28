import type { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

/**
 * Wraps provided children inside the application's AnimationTemplate.
 *
 * @param children - React nodes to render within the template
 * @returns The AnimationTemplate element containing the given children
 */
export default function ProjectTemplate({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
