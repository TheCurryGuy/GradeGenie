import SidebarItem from "./SidebarItem";
import { StateContext } from "../Context API/StateContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { LiaBookReaderSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";

export const Sidebar = () => {
    const { setHome, setAssignments, setSubmissions } = useContext(StateContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const HomeIcon = () => <FaHome className="w-6 h-6" />;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleHomeClick = () => {
        setHome(true);
        setAssignments(false);
        setSubmissions(false);
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleAssignmentClick = () => {
        setHome(false);
        setAssignments(true);
        setSubmissions(false);
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSubmissionsClick = () => {
        setHome(false);
        setAssignments(false);
        setSubmissions(true);
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            {/* Hamburger menu for mobile */}
            {!isSidebarOpen && (
                <div className="md:hidden fixed top-4 left-4 z-40">
                    <button onClick={toggleSidebar} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <RxHamburgerMenu className="w-6 h-6" />
                    </button>
                </div>
            )}

            {/* Sidebar */}
            <div
                className={`bg-white border-r h-screen min-w-80 fixed md:relative transform transition-transform duration-300 ease-in-out z-40 md:z-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                {/* Sidebar Content */}
                <div className="flex flex-col h-full"> {/* Make the flex container take full height */}
                    {/* Top Section (Logo + Menu Toggle) */}
                    <div className="p-4 flex justify-between items-center">
                        <div
                            onClick={() => navigate("/")}
                            className="text-3xl ml-2 font-semibold flex items-center space-x-2 cursor-pointer text-blue-600"
                        >
                            GradeGenie
                        </div>
                        {isSidebarOpen && <div className = "md:hidden block">
                            <button onClick={toggleSidebar} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <RxHamburgerMenu className="w-6 h-6" />
                            </button>
                        </div>}
                    </div>
                    <div className="flex flex-col flex-grow justify-between"> {/* Use flex-grow to take remaining space */}
                        <nav className="p-4">
                            <SidebarItem onClick={handleHomeClick} icon={<HomeIcon />} text="Home" />
                            <SidebarItem onClick={handleAssignmentClick} icon={<LuNotebookPen />} text="Assignments" />
                            <SidebarItem onClick={handleSubmissionsClick} icon={<LiaBookReaderSolid />} text="Submissions" />
                        </nav>

                        {/* Bottom Section (Logout) */}
                        <div className="p-4">
                            <SidebarItem onClick={handleLogoutClick} icon={<AiOutlineLogout />} text="Logout" />
                        </div>
                    </div>
                    {/* Middle Section (Navigation Items) */}

                </div>
            </div>
        </>
    );
};

export default Sidebar;