import { ReactElement } from "react";

interface itemProps {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
    active?: boolean;
}

const SidebarItem = (props: itemProps) => {
    return (
        <div
            onClick={props.onClick}
            className={`flex items-center space-x-3 py-3 px-4 cursor-pointer rounded-lg transition-all duration-200 group
                ${props.active 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
        >
            <div className={`${props.active 
                ? "text-indigo-600" 
                : "text-gray-500 group-hover:text-indigo-600"
            } transition-colors duration-200`}>
                {props.icon}
            </div>
            <span className={`text-base font-medium ${props.active 
                ? "text-indigo-700" 
                : "text-gray-700 group-hover:text-indigo-700"
            } transition-colors duration-200`}>
                {props.text}
            </span>
        </div>
    );
};
export default SidebarItem;