import { cn } from "@/lib/utils";

export const MapBox = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("fill-black dark:fill-white", className)}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <circle cx="512" cy="512" r="512" className="fill-black dark:fill-white"></circle>
                <path
                    d="M512 256c-141.39 0-256 114.61-256 256s114.61 256 256 256 256-114.61 256-256-114.61-256-256-256zm121.52 318.78c-87.52 87.54-243.9 59.6-243.9 59.6S361.4 478.3 449.23 390.47c48.67-48.67 129.3-46.65 180.27 4s52.7 131.6 4 180.27zM541.37 406l-25.05 51.55-51.55 25.05 51.55 25.05 25.05 51.55 25.05-51.55L618 482.63l-51.55-25.05z"
                    className="fill-white dark:fill-black"
                ></path>
            </g>
        </svg>
    );
};
