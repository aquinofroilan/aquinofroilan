import React from "react";
import { ThemeToggler } from "../theme-toggler";

const Footer = () => {
    return (
        <footer className="pt-3 flex items-center justify-between w-full max-w-5xl">
            <p className="text-xs ml-3">© {new Date().getFullYear()} Froilan Aquino. All rights reserved.</p>
            <ThemeToggler />
        </footer>
    );
};

export default Footer;
