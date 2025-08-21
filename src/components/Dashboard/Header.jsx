import { LogOut, Menu } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
    const sidebarRef = useRef(null);
    const menuButtonRef = useRef(null);
    const dropdownRef = useRef(null); // Ref for dropdown

    const handleLogout = () => {
        navigate('/login');
        setIsDropdownOpen(false); // Close dropdown on logout
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Toggle dropdown on click for mobile
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown and sidebar when clicking outside
    const handleClickOutside = (event) => {
        if (
            isSidebarOpen &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            menuButtonRef.current &&
            !menuButtonRef.current.contains(event.target)
        ) {
            setIsSidebarOpen(false);
        }
        if (
            isDropdownOpen &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, isDropdownOpen]);

    return (
        <>
            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                sidebarRef={sidebarRef}
                onLinkClick={() => setIsSidebarOpen(false)}
            />

            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-1.5 flex justify-between items-center w-full">
                {/* Left Section - Menu Button (Mobile) */}
                <div className="flex items-center">
                    <button
                        ref={menuButtonRef}
                        className="md:hidden p-2 cursor-pointer bg-white"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {/* Right Section - Aligned to right on all screens */}
                <div className="flex justify-end items-center ml-auto">
                    <div className="relative group" ref={dropdownRef}>
                        <div
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={toggleDropdown} // Toggle dropdown on click
                        >
                            <div className="text-right">
                                <div className="text-[12px] font-[Roboto] text-gray-900">Bura</div>
                                <div className="text-xs text-gray-500">Pa</div>
                            </div>
                            <div className="w-7 h-7 bg-[#3040D6] rounded-full flex items-center justify-center text-white font-semibold">
                                B
                            </div>
                        </div>

                        {/* Logout Menu */}
                        <div
                            className={`absolute right-0 mt-1.5 shadow-sm w-28 bg-white rounded-[3px] transition-all duration-200 flex items-center justify-center
                ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} 
                md:group-hover:opacity-100 md:group-hover:visible`} // Hover for desktop, click for mobile
                        >
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                            >
                                <LogOut className="w-3 h-3" />
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;