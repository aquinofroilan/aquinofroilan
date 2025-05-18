import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Badge } from "@/components/ui";
import { ExpertiseList } from "@/data/expertise-list";

export const metadata = {
    title: "Expertise | Froilan J. Aquino | Web Developer",
    description: "Personal Website of Froilan",
};

const Expertise = ({}) => {
    return (
        <div className="max-w-7xl w-11/12 flex flex-col gap-2 justify-start items-start">
            <h1 className="font-bold text-3xl lg:font-extrabold md:text-4xl lg:text-5xl xl:text-8xl">Expertise</h1>
            <div className="w-full flex mt-2 flex-col gap-10">
                {ExpertiseList.map((expertise, index) => (
                    <div key={index} className="w-full flex flex-col">
                        <Card>
                            <CardHeader>
                                <CardTitle>{expertise.name}</CardTitle>
                                <CardDescription>{expertise.dateObtained}</CardDescription>
                            </CardHeader>
                            <CardContent>{expertise.content}</CardContent>
                            <CardFooter className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                                {expertise.badge.map((badge, index) => (
                                    <Badge key={index} className="w-fit">
                                        {badge}
                                    </Badge>
                                ))}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expertise;
