import Logo from "@/components/logo";
import NavLinks from "@/components/navigation-bar/nav-links";
import Socials from "@/components/navigation-bar/socials";

const NavBar = () => {
    return (
        <>
            <div className="hidden md:flex w-full md:w-[95%] lg:w-[85%] xl:w-[80%] items-center flex-row justify-between">
                <Logo />
                <NavLinks />
                <Socials />
            </div>
        </>
    );
};

export default NavBar;
