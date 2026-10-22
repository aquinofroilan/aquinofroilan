"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    id: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Workflows", href: "#workflows", id: "workflows" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#contact", id: "contact" },
];

export interface BlueprintNavbarProps {
    className?: string;
}

export function BlueprintNavbar({ className }: BlueprintNavbarProps) {
    const [activeSection, setActiveSection] = useState<string>("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Active section detection with IntersectionObserver or scroll position
            const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

            if (sections.length === 0) return;

            const scrollPosition = window.scrollY + 120; // offset for navbar height

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    return;
                }
            }

            // Fallback to top section if scrolled near top
            if (window.scrollY < 100) {
                setActiveSection(NAV_ITEMS[0].id);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${targetId}`);
            setActiveSection(targetId);
        } else if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "#");
            setActiveSection("home");
        }
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-200 border-b",
                isScrolled
                    ? "bg-background/90 backdrop-blur-md border-border/80 shadow-xs"
                    : "bg-background/70 backdrop-blur-xs border-border/40",
                className,
            )}
        >
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand header */}
                <Link
                    href="#home"
                    onClick={(e) => handleNavClick(e, "home")}
                    className="group flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors"
                >
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                        FROILAN AQUINO
                    </span>
                    <span className="text-muted-foreground/60 select-none">/</span>
                    <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                        portfolio
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 font-mono text-xs">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.id)}
                                className={cn(
                                    "relative flex items-center gap-1.5 px-3 py-1.5 transition-all duration-150 rounded-none border border-transparent",
                                    isActive
                                        ? "text-foreground font-semibold border-border/80 bg-muted/40 shadow-2xs"
                                        : "text-muted-foreground hover:text-foreground hover:border-border/40 hover:bg-muted/20",
                                )}
                            >
                                <span
                                    className={cn(
                                        "h-1.5 w-1.5 transition-all duration-150",
                                        isActive
                                            ? "bg-primary scale-100"
                                            : "bg-transparent scale-0 group-hover:scale-75",
                                    )}
                                />
                                <span className="tracking-wide uppercase">{item.label}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="md:hidden flex items-center justify-center h-8 w-8 rounded-none border border-border text-foreground hover:bg-muted/50 focus:outline-hidden focus:ring-1 focus:ring-ring"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-3">
                    <nav className="flex flex-col gap-1 font-mono text-xs">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                    className={cn(
                                        "flex items-center gap-2.5 px-3 py-2.5 rounded-none border transition-all duration-150",
                                        isActive
                                            ? "border-border bg-muted/60 text-foreground font-semibold"
                                            : "border-transparent text-muted-foreground hover:border-border/40 hover:bg-muted/20 hover:text-foreground",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-1.5 w-1.5 transition-all duration-150",
                                            isActive ? "bg-primary scale-100" : "bg-muted-foreground/30 scale-75",
                                        )}
                                    />
                                    <span className="tracking-wide uppercase">{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
