import Link from "next/link";

const Logo = () => {
    return (
        <>
            <div className="flex flex-col justify-start start sm:w-1/4">
                <Link href="/" className="font-bold text-lg lg:text-xl">
                    Froilan
                </Link>
                <p className="text-primary font-normal text-sm md:text-base">Web Developer</p>
            </div>
        </>
    );
};

export default Logo;
