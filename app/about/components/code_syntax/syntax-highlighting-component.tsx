import React from "react";

export const Comments = ({ comment_content }: { comment_content: string }) => {
    return <p className="text-[#6272A4]"># {comment_content}</p>;
};

export const VariableDeclaration = ({ variable_name }: { variable_name: string }) => {
    return <p className="text-[#F8F8F2]">{variable_name} = </p>;
};

export const StringKeyValueDictionary = ({
    dict_key,
    value,
    className,
}: {
    dict_key: string;
    value: string;
    className?: string;
}) => {
    return (
        <div className={`${className} flex flex-row items-center`}>
            <p className="text-[#F1FA8C]">&apos;{dict_key}&apos;</p>
            <p className="text-[#F1FA8C]">
                <span className="text-[#F8F8F2]">:</span> &apos;{value}&apos;
                <span className="text-[#F8F8F2]">,</span>
            </p>
        </div>
    );
};

export const StringKeyNonStringValueDictionary = ({ dict_key, value }: { dict_key: string; value: string }) => {
    return (
        <div className="flex flex-row">
            <p className="text-[#F1FA8C]">&apos;{dict_key}&apos;</p>
            <p className="text-[#BD93F9]">
                : {value}
                <span className="text-[#F8F8F2]">,</span>
            </p>
        </div>
    );
};
