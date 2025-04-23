"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";

const Links = ({}) => {
  const pathname = usePathname();
  const ActiveLink = (path: string): boolean => {
    return pathname === path;
  };
  return (
    <div className="flex h-fit gap-3 flex-row">
      <Link
        className={`${
          ActiveLink("/about") ? "font-bold text-primary" : "font-medium"
        } text-sm md:text-base flex flex-col justify-center items-center`}
        href="/about"
      >
        About{" "}
        <RxDotFilled
          className={`${ActiveLink("/about") ? "opacity-100" : "opacity-0"}`}
        />
      </Link>
      <Link
        className={`${
          ActiveLink("/expertise") ? "font-bold text-primary" : "font-medium"
        } text-sm md:text-base flex flex-col justify-center items-center`}
        href="/expertise"
      >
        Expertise{" "}
        <RxDotFilled
          className={`${
            ActiveLink("/expertise") ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>
      <Link
        className={`${
          ActiveLink("/experience") ? "font-bold text-primary" : "font-medium"
        } text-sm md:text-base flex flex-col justify-center items-center`}
        href="/experience"
      >
        Experience{" "}
        <RxDotFilled
          className={`${
            ActiveLink("/experience") ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>
      <Link
        className={`${
          ActiveLink("/contact") ? "font-bold text-primary" : "font-medium"
        } text-sm md:text-base flex flex-col justify-center items-center`}
        href="/contact"
      >
        Contact{" "}
        <RxDotFilled
          className={`${ActiveLink("/contact") ? "opacity-100" : "opacity-0"}`}
        />
      </Link>
    </div>
  );
};

export default Links;
