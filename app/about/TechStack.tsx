import React from "react";
import {
  MySQL,
  NextJS,
  ReactJS,
  Postgresql,
  Firebase,
  Supabase,
  Github,
  TailWindCSS,
  Figma,
} from "@/app/about/SVGIcons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

const TechStack = () => {
  const TechStackName: string[] = [
    "nextjs",
    "reactjs",
    "mysql",
    "postgresql",
    "firebase",
    "supabase",
    "github",
    "tailwindcss",
    "figma",
  ];
  const TechStack = [
    {
      id: 1,
      url: "https://nextjs.org/",
      component: <NextJS />,
      content: "The Next.js Framework – created and maintained by @vercel.",
    },
    {
      id: 2,
      url: "https://reactjs.dev/",
      component: <ReactJS />,
      content: "The React.js Library – created and maintained by Facebook.",
    },
    {
      id: 3,
      url: "https://www.mysql.com/",
      component: <MySQL />,
      content: "MySQL – an open-source relational database management system.",
    },
    {
      id: 4,
      url: "https://www.postgresql.org/",
      component: <Postgresql />,
      content:
        "PostgreSQL – an open-source relational database management system.",
    },
    {
      id: 5,
      url: "https://firebase.google.com/",
      component: <Firebase />,
      content:
        "Firebase – a platform developed by Google for creating mobile and web applications.",
    },
    {
      id: 6,
      url: "https://supabase.com/",
      component: <Supabase />,
      content: "Supabase – an open source Firebase alternative.",
    },
    {
      id: 7,
      url: "https://www.github.com/",
      component: <Github />,
      content: "GitHub – a platform for version control and collaboration.",
    },
    {
      id: 8,
      url: "https://tailwindcss.com/",
      component: <TailWindCSS />,
      content:
        "Tailwind CSS – a utility-first CSS framework for rapidly building custom designs.",
    },
    {
      id: 9,
      url: "https://www.figma.com/",
      component: <Figma />,
      content:
        "Figma – a cloud-based design tool for collaborative interface design.",
    },
  ];
  return (
    <>
      <div className="w-full flex gap-y-3 items-center flex-start flex-col justify-center">
        <h1 className="font-bold text-2xl">My TechStack</h1>
        <div className="grid w-full md:w-[90%] lg:w-full p-4 gap-7 lg:grid-cols-4 grid-cols-3">
          {TechStack.map((tech, index) => (
            <HoverCard key={tech.id}>
              <HoverCardTrigger asChild>
                <Link target="_blank" href={tech.url}>
                  <div className="flex hover:cursor-pointer flex-col items-center justify-center">
                    <p className="font-bold text-sm">@{TechStackName[index]}</p>
                  </div>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between items-center space-x-4">
                  {tech.component}
                  <div className="space-y-1">
                    <p className="text-sm">{tech.content}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default TechStack;
