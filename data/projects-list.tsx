import {
    Expo,
    Flask,
    Java,
    Kotlin,
    MapBox,
    NextJS,
    PostgreSQL,
    Prisma,
    Python,
    React,
    SpringBoot,
    TailwindCSS,
    TypeScript,
    Vercel,
} from "@/components/atoms";
import { ReactNode } from "react";

type FooterItem = {
    text: string;
    icon: ReactNode;
};

export type ProjectItem = {
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    pageLink: string;
    projectLink: string[];
    footerContent: FooterItem[];
    // Details page specific
    imgPrefix?: string;
    techStackEntries?: ReactNode[];
};

export const ProjectsList: ProjectItem[] = [
    {
        slug: "synectix",
        title: "Synectix",
        description: "Full stack ERP system built with Spring Boot and NextJS",
        longDescription:
            "Synectix is a comprehensive Enterprise Resource Planning (ERP) system tailored for hobbyist businesses and small-to-medium enterprises. Its backend, built with modern Java technologies, delivers robust solutions for inventory management, warehouse operations, user management, and business analytics.",
        imgPrefix: "synectix-",
        pageLink: "/projects/synectix",
        projectLink: [
            "https://github.com/aquinofroilan/synectix-kt",
            "https://github.com/aquinofroilan/synectix-next",
        ],
        footerContent: [
            {
                text: "Java",
                icon: <Java className="w-5 h-5" />,
            },
            {
                text: "Kotlin",
                icon: <Kotlin className="w-5 h-5" />,
            },
            {
                text: "Spring Boot",
                icon: <SpringBoot className="w-5 h-5" />,
            },
            {
                text: "PostgreSQL",
                icon: <PostgreSQL className="w-5 h-5" />,
            },
        ],
        techStackEntries: [
            <TailwindCSS key="tailwind" className="w-6 h-6" />,
            <Java key="java" className="w-6 h-6" />,
            <PostgreSQL key="postgres" className="w-6 h-6" />,
            <NextJS key="nextjs" className="w-6 h-6" />,
            <TypeScript key="ts" className="w-6 h-6" />,
            <SpringBoot key="spring" className="w-6 h-6" />,
        ],
    },
    {
        slug: "pawsitive",
        title: "Pawsitive Health | Capstone",
        description: "Full stack app for a pet health management system built with NextJS and PostgreSQL",
        longDescription:
            "Pet health management app that helps pet owners keep track of their pets' health records, appointments, and medications. Built with React Next.Js, Vercel, Tailwind CSS, and PostgreSQL.",
        imgPrefix: "pawsitive-",
        pageLink: "/projects/pawsitive",
        projectLink: ["https://github.com/aquinofroilan/pawsitive-health"],
        footerContent: [
            {
                text: "NextJS",
                icon: <NextJS className="w-5 h-5" />,
            },
            {
                text: "PostgreSQL",
                icon: <PostgreSQL className="w-5 h-5" />,
            },
        ],
        techStackEntries: [
            <TailwindCSS key="tailwind" className="w-6 h-6" />,
            <PostgreSQL key="postgres" className="w-6 h-6" />,
            <TypeScript key="ts" className="w-6 h-6" />,
            <Prisma key="prisma" className="w-6 h-6" />,
            <NextJS key="next" className="w-6 h-6" />,
            <React key="react" className="w-6 h-6" />,
            <Vercel key="vercel" className="w-6 h-6" />,
        ],
    },
    {
        slug: "ezp",
        title: "EZ Parking System",
        description: "Backend for a parking management system built with Python Flask",
        longDescription:
            "EZ Parking System is a comprehensive parking management solution designed to streamline parking operations. Built with Python Flask, it offers features such as real-time parking space tracking, and automated ticketing, enhancing the overall efficiency and user experience for both parking operators and customers.",
        imgPrefix: "ez-parking-",
        pageLink: "/projects/ezp",
        projectLink: ["https://github.com/aquinofroilan/ez-parking-system"],
        footerContent: [
            {
                text: "Python",
                icon: <Python className="w-5 h-5" />,
            },
            {
                text: "Flask",
                icon: <Flask className="w-5 h-5" />,
            },
            {
                text: "PostgreSQL",
                icon: <PostgreSQL className="w-5 h-5" />,
            },
        ],
        techStackEntries: [
            <PostgreSQL key="postgres" className="w-6 h-6" />,
            <TypeScript key="ts" className="w-6 h-6" />,
            <React key="react" className="w-6 h-6" />,
            <Expo key="expo" className="w-6 h-6" />,
            <Python key="python" className="w-6 h-6" />,
            <Flask key="flask" className="w-6 h-6" />,
            <MapBox key="mapbox" className="w-6 h-6" />,
        ],
    },
];
