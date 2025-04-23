import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Contacts - Froilan | Web Developer",
};

const Contacts = () => {
  return (
    <div
      className="
				w-[95%]
				md:w-[90%]
				lg:w-[80%]
				xl:w-[70%]
				flex
				flex-col
				gap-2
				justify-start
				items-start"
    >
      <h1
        className="
					font-bold
					text-3xl
					lg:font-extrabold
					md:text-4xl
					lg:text-5xl
					xl:text-8xl"
      >
        Contact
      </h1>
      <Card
        className="
					w-[95%]
					md:w-[90%]
					lg:w-[80%]
					xl:w-[50%]
					flex
					flex-col
					gap-10
					justify-start
					items-start"
      >
        <CardHeader>
          <CardTitle>Contact me via email</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>
            Feel at liberty to reach out to me via{" "}
            <Link
              className="font-bold text-primary"
              href="mailto:froilanaquino1@gmail.com"
            >
              email
            </Link>
            .
          </h1>
          <h1 className="text-primary">froilanaquino1@gmail.com</h1>
        </CardContent>
        <CardFooter>
          <Button asChild variant={"default"}>
            <Link
              href={
                "https://drive.google.com/uc?export=download&id=1qJFWnTVrOrhMwf7bmehjFgvQe5BbFe-A"
              }
            >
              Get my CV
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Contacts;
