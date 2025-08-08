import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Store, Users, FileText, BarChart3, Menu } from "lucide-react"
import logo from "../../assets/logo (1).png"
import { Link, NavLink } from "react-router-dom"

const Sidebar = () => {
    const [activeNav, setActiveNav] = useState("Dashboard")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const navigationItems = [
        { name: "Dashboard", icon: Home, link: "/dashboard" },
        { name: "Events", icon: Calendar, link: "/events" },
        { name: "Shops", icon: Store, link: "/shop" },
        { name: "Cashiers", icon: Users, link: "/cashier" },
        { name: "Bet Slip", icon: FileText, link: "/betslip" },
        { name: "Reports", icon: BarChart3, link: "/reports" },
    ]

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            {/* Menu Button for Mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-sm"
                onClick={toggleSidebar}
            >
                <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-white shadow-sm border-r border-gray-200 flex flex-col pb-10 z-10 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                {/* Logo */}
                <div className="mb-0 flex justify-center items-center p-3">
                    <div className="text-3xl font-bold text-black mb-1">
                        <span className="text-green-500">
                            <img src={logo} alt="" width={135} />
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 overflow-y-auto">
                    <div className="px-5 " >
                        <h3 className="text-[10px] ml-3 font-[400] uppercase tracking-wider mb-2">NAVIGATION</h3>
                        <nav className="space-y-0">
                            <div>
                                {navigationItems.slice(0, 5).map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <NavLink
                                            to={item.link}
                                            key={item.name}
                                            onClick={() => {
                                                setActiveNav(item.name)
                                                setIsSidebarOpen(false) // Close sidebar on mobile after click
                                            }}
                                            className={`w-full flex items-center px-3 py-[7px] text-[11px] font-medium rounded-[3px] transition-colors ${activeNav === item.name
                                                ? "bg-[#D6D9F7] text-blue-700"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-[#CED2D4]"
                                                }`}
                                        >
                                            <Link to={item.link} className="flex items-center w-full">
                                                <Icon className="mr-3 h-3 w-3" />
                                                {item.name}
                                            </Link>
                                        </NavLink>
                                    )
                                })}
                            </div>
                            <div className="absolute bottom-12 right-0 left-0 px-4 border-gray-200 mt-4 pt-4 ml-3">
                                <h2 className="text-[10px] ml-3 font-[400] uppercase tracking-wider mb-2">pages</h2>
                                {navigationItems.slice(5, 6).map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <NavLink
                                            to={item.link}
                                            key={item.name}
                                            onClick={() => {
                                                setActiveNav(item.name)
                                                setIsSidebarOpen(false) // Close sidebar on mobile after click
                                            }}
                                            className={`w-full flex items-center px-3 py-[7px] text-[11px] font-medium rounded-[3px] transition-colors ${activeNav === item.name
                                                ? "bg-[#D6D9F7] text-blue-700"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-[#CED2D4]"
                                                }`}
                                        >

                                            <Link to={item.link} className="flex items-center w-full">
                                                {/* <Icon className="mr-3 h-3 w-3" /> */}
                                                {item.name}
                                            </Link>
                                        </NavLink>
                                    )
                                })}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar