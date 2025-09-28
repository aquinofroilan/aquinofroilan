import { SpringBoot } from "@/components/atoms/icons/springboot";
import { Java } from "@/components/atoms/icons/java";
import { PostgreSQL } from "@/components/atoms/icons/postgresql";
import { Python } from "@/components/atoms/icons/python";
import { Flask } from "@/components/atoms/icons/flask";
import { NextJS } from "@/components/atoms/icons/nextjs";

import { ReactNode } from "react";

type FooterItem = {
    text: string;
    icon: ReactNode;
};

type ProjectItem = {
    title: string;
    description: string;
    link: string;
    footerContent: FooterItem[];
};

export const ProjectsList: ProjectItem[] = [
    {
        title: "Pawsitive Health | Capstone",
        description: "Full stack app for a pet health management system built with NextJS and PostgreSQL",
        link: "https://github.com/aquinofroilan/pawsitive-health",
        footerContent: [
            {
                text: "NextJS",
                icon: <NextJS className="w-5 h-5 md:w-6 md:h-6" />,
            },
            {
                text: "PostgreSQL",
                icon: <PostgreSQL className="w-5 h-5 md:w-6 md:h-6" />,
            },
        ],
    },
    {
        title: "Synectix",
        description: "Backend for an ERP system built with Spring Boot",
        link: "https://github.com/aquinofroilan/synectix",
        footerContent: [
            {
                text: "Java",
                icon: <Java className="w-5 h-5 md:w-6 md:h-6" />,
            },
            {
                text: "Spring Boot",
                icon: <SpringBoot className="w-5 h-5 md:w-6 md:h-6" />,
            },
            {
                text: "PostgreSQL",
                icon: <PostgreSQL className="w-5 h-5 md:w-6 md:h-6" />,
            },
        ],
    },
    {
        title: "EZ Parking System",
        description: "Backend for a parking management system built with Python Flask",
        link: "https://github.com/aquinofroilan/ez-parking-system",
        footerContent: [
            {
                text: "Python",
                icon: <Python className="w-5 h-5 md:w-6 md:h-6" />,
            },
            {
                text: "Flask",
                icon: <Flask className="w-5 h-5 md:w-6 md:h-6" />,
            },
            {
                icon: <PostgreSQL className="w-5 h-5 md:w-6 md:h-6" />,
                text: "PostgreSQL",
            },
        ],
    },
];
