import { SpringBoot } from "@/components/atoms/icons/springboot";
import { Java } from "@/components/atoms/icons/java";
import { PostgreSQL } from "@/components/atoms/icons/postgresql";
import { Python } from "@/components/atoms/icons/python";
import { Flask } from "@/components/atoms/icons/flask";
import { NextJS } from "@/components/atoms/icons/nextjs";

import {ReactNode} from "react";

type FooterItem = {
    text: string;
    icon: ReactNode;
};

type ProjectItem = {
    title: string;
    description: string;
    link:  string;
    footerContent: FooterItem[];
};

export const ProjectsList: ProjectItem[] = [
    {
        title: "Pawsitive Health | Capstone",
        description:
            "Full stack application for a pet health management system built with NextJS and PostgreSQL",
        link: "https://github.com/aquinofroilan/pawsitive-health",
        footerContent: [
            {
                text: "NextJS",
                icon: <NextJS/>
            },
            {
                text: "PostgreSQL",
                icon: <PostgreSQL/>
            }
        ]
    },
    {
        title: "Synectix",
        description: "Backend for an ERP system built with Spring Boot",
        link: "https://github.com/aquinofroilan/synectix",
        footerContent: [
            {
                text: "Java",
                icon: <Java />
            },
            {
                text: "Spring Boot",
                icon: <SpringBoot />
            },
            {
                text: "PostgreSQL",
                icon: <SpringBoot />
            }
        ]
    },
    {
        title: "EZ Parking System",
        description: "Backend for a parking management system built with Python Flask",
        link: "https://github.com/aquinofroilan/ez-parking-system",
        footerContent: [
            {
                text: "Python",
                icon: <Python />
            },
            {
                text: "Flask",
                icon: <Flask />
            },
            {
                icon: <PostgreSQL />,
                text: "PostgreSQL"
            }
        ]
    }
];
