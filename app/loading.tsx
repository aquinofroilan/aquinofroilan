import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex items-center flex-col gap-2 justify-center h-screen">
                <Loader className="animate-spin" size={20} />
                <h1 className="font-bold">Loading...</h1>
            </div>
        </div>
    );
};

export default Loading;
