import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Optional: clear authentication data
        // localStorage.removeItem('authToken');

        navigate('/login') // Redirect to login page
    }

    return (
        <header className="bg-white  shadow-sm border-b border-gray-200 px-6 py-1.5">
            <div className="flex justify-end items-center">
                {/* Profile + Logout Dropdown */}
                <div className="relative group">
                    {/* Profile Section */}
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <div className="text-right">
                            <div className="text-[12px] font-[Roboto] text-gray-900">Bura</div>
                            <div className="text-xs text-gray-500">Pa</div>
                        </div>
                        <div className="w-7 h-7 bg-[#3040D6] rounded-full flex items-center justify-center text-white font-semibold">
                            B
                        </div>
                    </div>

                    {/* Logout Menu */}
                    <div className="absolute -right-2 mt-1.5 shadow-sm w-28 bg-white border border-none rounded-[3px]  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex items-center justify-center">
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
    )
}

export default Header
