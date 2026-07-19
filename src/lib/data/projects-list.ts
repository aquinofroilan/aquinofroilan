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
	Vercel
} from '$lib/components/atoms';
import type { Component } from 'svelte';

type FooterItem = {
	text: string;
	icon: Component<{ class?: string; size?: number | string }>;
};

export type ProjectItem = {
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	pageLink: string;
	projectLink: { label: string; url: string }[];
	footerContent: FooterItem[];
	// Details page specific
	imgPrefix?: string;
	techStackEntries?: Component<{ class?: string; size?: number | string }>[];
};

export const ProjectsList: ProjectItem[] = [
	{
		slug: 'tessera',
		title: 'Tessera',
		description: 'Full stack ERP system built with Spring Framework, Kotlin and NextJS',
		longDescription:
			'Tessera is a comprehensive Enterprise Resource Planning (ERP) system tailored for hobbyist businesses and small-to-medium enterprises. Its backend, built with modern Java technologies, delivers robust solutions for inventory management, warehouse operations, user management, and business analytics.',
		imgPrefix: 'tessera-',
		pageLink: '/projects/tessera',
		projectLink: [
			{ label: 'Backend', url: 'https://github.com/aquinofroilan/tessera-kt' },
			{ label: 'Frontend', url: 'https://github.com/aquinofroilan/tessera-next' }
		],
		footerContent: [
			{
				text: 'Java',
				icon: Java
			},
			{
				text: 'Kotlin',
				icon: Kotlin
			},
			{
				text: 'Spring Boot',
				icon: SpringBoot
			},
			{
				text: 'PostgreSQL',
				icon: PostgreSQL
			}
		],
		techStackEntries: [TailwindCSS, Java, PostgreSQL, NextJS, TypeScript, SpringBoot]
	},
	{
		slug: 'pawsitive',
		title: 'Pawsitive Health | Capstone',
		description:
			'Full stack app for a pet health management system built with NextJS and PostgreSQL',
		longDescription:
			"Pet health management app that helps pet owners keep track of their pets' health records, appointments, and medications. Built with React Next.Js, Vercel, Tailwind CSS, and PostgreSQL.",
		imgPrefix: 'pawsitive-',
		pageLink: '/projects/pawsitive',
		projectLink: [
			{ label: 'Repository', url: 'https://github.com/aquinofroilan/pawsitive-health' }
		],
		footerContent: [
			{
				text: 'NextJS',
				icon: NextJS
			},
			{
				text: 'PostgreSQL',
				icon: PostgreSQL
			}
		],
		techStackEntries: [TailwindCSS, PostgreSQL, TypeScript, Prisma, NextJS, React, Vercel]
	},
	{
		slug: 'ezp',
		title: 'EZ Parking System',
		description: 'Backend for a parking management system built with Python Flask',
		longDescription:
			'EZ Parking System is a comprehensive parking management solution designed to streamline parking operations. Built with Python Flask, it offers features such as real-time parking space tracking, and automated ticketing, enhancing the overall efficiency and user experience for both parking operators and customers.',
		imgPrefix: 'ez-parking-',
		pageLink: '/projects/ezp',
		projectLink: [
			{ label: 'Repository', url: 'https://github.com/aquinofroilan/ez-parking-system' }
		],
		footerContent: [
			{
				text: 'Python',
				icon: Python
			},
			{
				text: 'Flask',
				icon: Flask
			},
			{
				text: 'PostgreSQL',
				icon: PostgreSQL
			}
		],
		techStackEntries: [PostgreSQL, TypeScript, React, Expo, Python, Flask, MapBox]
	}
];
