import { ReactElement } from "react";

interface itemProps {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
}

const SidebarItem = (props: itemProps) => {
    return (
        <div
            onClick={props.onClick}
            className="flex items-center space-x-2 py-2 px-4 text-lg font-medium text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md"
        >
            {props.icon}
            <span>{props.text}</span>
        </div>
    );
};
export default SidebarItem;