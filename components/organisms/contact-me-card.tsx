import { BentoGridItem, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { Github, Instagram, LinkedIn } from "@/components/atoms";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";

function ContactMe() {
    return (
        <BentoGridItem
            title={<h1>Contact Me</h1>}
            icon={<Send size={20} />}
            description={
                <div className="flex flex-col gap-5">
                    <div>
                        <h1>Email:</h1>
                        <div className="flex flex-col">
                            <Link
                                className="underline text-primary font-bold"
                                href="mailto:froilan.j.aquino@gmail.com"
                                target="_blank"
                            >
                                froilan.j.aquino@gmail.com
                            </Link>
                            <Link
                                className="underline text-primary font-bold"
                                href="mailto:aquino.froilan@outlook.com"
                                target="_blank"
                            >
                                aquino.froilan@outlook.com
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h1>Social Links:</h1>
                        <div className="flex flex-row gap-3">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        className="bg-neutral-200 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                        aria-label="Github link of the website owner"
                                        target="_blank"
                                        href="https://github.com/froilanimnida"
                                    >
                                        <Github />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>@froilanimnida</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        className="bg-neutral-200 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                        aria-label="Instagram Profile of the website owner"
                                        target="_blank"
                                        href="https://www.instagram.com/froilanimnida"
                                    >
                                        <Instagram />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>@froilanimnida</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        className="bg-neutral-200 w-full justify-center flex items-center py-2 px-2 rounded-md"
                                        aria-label="LinkedIn link of the website owner"
                                        target="_blank"
                                        href="https://linkedin.com/in/froilanimnida"
                                    >
                                        <LinkedIn />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>@froilanimnida</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <h1>Let&apos;s talk:</h1>
                        <Link
                            href={"https://calendly.com/froilaniminida/15min"}
                            className="bg-neutral-200 w-full justify-between flex items-center py-2 px-2 rounded-md"
                        >
                            Schedule a call
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div>
                        <h1>My Resume/CV:</h1>
                        <Link
                            href={"https://drive.google.com/file/d/1tBgDb_ft-XHI801KDlWLez21sBI48-AY/view?usp=sharing"}
                            className="bg-neutral-200 w-full justify-between flex items-center py-2 px-2 rounded-md"
                        >
                            View my CV
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            }
        />
    );
}

export default ContactMe;
