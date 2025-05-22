import { ThemeToggler } from "../theme-toggler";
import { Separator } from "@/components/ui";
export const Footer = () => {
    return (
        <>
            <footer className="pt-3 flex flex-col items-center justify-between w-full max-w-5xl">
                <Separator className="w-11/12 max-w-5xl" />
                <div className="flex flex-row items-center justify-between w-11/12 max-w-5xl py-5">
                    <p className="text-xs md:text-sm ml-3">
                        © {new Date().getFullYear()} Froilan Aquino. All rights reserved.
                    </p>
                    <ThemeToggler />
                </div>
            </footer>
        </>
    );
};
