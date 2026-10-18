import type { ReactNode } from "react";
import AnimationTemplate from "@/components/templates/animation-template";

/**
 * Wraps the provided children with the AnimationTemplate layout.
 *
 * @param children - Content to render inside the AnimationTemplate
 * @returns A JSX element that renders `children` within the AnimationTemplate
 */
export default function ProjectTemplate({ children }: { children: ReactNode }) {
    return <AnimationTemplate>{children}</AnimationTemplate>;
}
