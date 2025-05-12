import Logo from "@/components/logo";
import Links from "@/components/NavigationBar/Links";
import Socials from "@/components/NavigationBar/Socials";

const NavBar = () => {
    return (
        <>
            <div className="hidden md:flex w-full md:w-[95%] lg:w-[85%] xl:w-[80%] items-center flex-row justify-between">
                <Logo />
                <Links />
                <Socials />
            </div>
        </>
    );
};

export default NavBar;
