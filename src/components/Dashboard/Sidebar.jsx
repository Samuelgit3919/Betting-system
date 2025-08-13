import { useState } from "react"
import { Home, CirclePlay, Monitor, SlidersVertical, FileText, BarChart3 } from "lucide-react"
import logo from "../../assets/logo (1).png"
import { Link, NavLink } from "react-router-dom"

const Sidebar = ({ isSidebarOpen, toggleSidebar, onLinkClick }) => {
    const [activeNav, setActiveNav] = useState("Dashboard")

    const navigationItems = [
        { name: "Dashboard", icon: Home, link: "/dashboard" },
        { name: "Events", icon: CirclePlay, link: "/events" },
        { name: "Shops", icon: Monitor, link: "/shop" },
        { name: "Cashiers", icon: SlidersVertical, link: "/cashier" },
        { name: "Bet Slip", icon: FileText, link: "/betslip" },
        { name: "Reports", icon: BarChart3, link: "/reports" },
    ]


    return (
        <div
            className={`fixed top-0 left-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} h-full w-50 bg-white shadow-sm border-r border-gray-200 flex flex-col pb-10 z-10 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
            {/* Logo */}
            <div className="mb-0 flex justify-center items-center p-3">
                <Link to='/' className="text-3xl font-bold text-black mb-1">
                    <span className="text-green-500">
                        <img src={logo} alt="" width={115} />
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 overflow-y-auto">
                <div className="px-5">
                    <h3 className="text-[9px] ml-3 font-normal uppercase mb-2">NAVIGATION</h3>
                    <nav className="space-y-0">
                        {navigationItems.slice(0, 5).map((item) => {
                            const Icon = item.icon
                            return (
                                <NavLink
                                    to={item.link}
                                    key={item.name}
                                    onClick={() => {
                                        setActiveNav(item.name)
                                        toggleSidebar() // close after click on mobile
                                        onLinkClick()
                                    }}

                                    className={`w-full flex items-center px-3 py-[5px] text-[10px] font-medium rounded-[3px] transition-colors ${activeNav === item.name
                                        ? "bg-[#D6D9F7] text-blue-700"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-[#CED2D4]"
                                        }`}
                                >
                                    <Icon className="mr-3 h-3 w-3" />
                                    {item.name}
                                </NavLink>
                            )
                        })}
                        <div className="absolute bottom-12 right-0 left-0 px-4 border-gray-200 mt-4 pt-4 ml-3">
                            <h2 className="text-[10px] ml-3 font-[400] uppercase tracking-wider mb-1">pages</h2>
                            {navigationItems.slice(5, 6).map((item) => (
                                <NavLink
                                    to={item.link}
                                    key={item.name}
                                    onClick={() => {
                                        setActiveNav(item.name)
                                        toggleSidebar()
                                    }}
                                    className={`w-full flex items-center px-3 py-[7px] text-[11px] font-medium rounded-[3px] transition-colors ${activeNav === item.name
                                        ? "bg-[#D6D9F7] text-blue-700"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-[#CED2D4]"
                                        }`}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default Sidebar
