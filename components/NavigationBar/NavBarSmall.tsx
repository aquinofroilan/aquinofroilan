import React from "react";
import Logo from "@/components/logo";
import Links from "@/components/NavigationBar/Links";
import Socials from "./Socials";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBarSmall = () => {
  return (
    <>
      <div
        className="
        flex
        flex-row
        items-start
        justify-between
        w-[95%]
        md:hidden
      "
      >
        <div
          className="
          flex
          flex-col
          w-[70%]
          gap-2
        "
        >
          <Logo />
          <Links />
        </div>
        <div
          className="
						w-[35%]
						flex
						flex-col
						justify-center
						items-end
						gap-5
						"
        >
          <Socials />
          <Button asChild variant={"default"}>
            <Link
              href={
                "https://drive.google.com/uc?export=download&id=1qJFWnTVrOrhMwf7bmehjFgvQe5BbFe-A"
              }
            >
              My CV
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavBarSmall;
