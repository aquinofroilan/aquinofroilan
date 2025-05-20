import React from "react";

function Footer() {
    return (
        <footer className="w-full border-t-[2px] border-t-neutral-100 dark:border-neutral-800 pt-3">
            <h1 className="text-sm md:text-base ml-3">
                © {new Date().getFullYear()} Froilan Aquino. All rights reserved.
            </h1>
        </footer>
    );
}

export default Footer;
