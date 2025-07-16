import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Store, Users, FileText, Settings, MessageCircle, BarChart3 } from "lucide-react"
import logo from "../../assets/logo (1).png"
import { Link, NavLink } from "react-router-dom"

const Sidebar = () => {
    const [activeNav, setActiveNav] = useState("Dashboard")

    const navigationItems = [
        { name: "Dashboard", icon: Home, link: "/dashboard" },
        { name: "Events", icon: Calendar, link: "/events" },
        { name: "Shops", icon: Store, link: "/shop" },
        { name: "Cashiers", icon: Users, link: "/cashier" },
        { name: "Bet Slip", icon: FileText, link: "/betslip" },
    ]

    const pageItems = [{ name: "Reports", icon: BarChart3 }]
    return (
        <div className="w-74 bg-white shadow-sm border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="mb-0 flex justify-center items-center p-4">
                <div className="text-3xl font-bold text-black mb-1">
                    <span className="text-green-500">
                        <img src={logo} alt="" width={170} />
                    </span>
                </div>

            </div>

            {/* Navigation */}
            <div className="flex-1 py-6">
                <div className="px-6 mb-0">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">NAVIGATION</h3>
                    <nav className="space-y-0">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <NavLink
                                    to={item.link}
                                    key={item.name}
                                    onClick={() => setActiveNav(item.name)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeNav === item.name
                                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    <Link to={item.link} className="flex items-center w-full">

                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                </NavLink>
                            )
                        })}
                    </nav>
                </div>


            </div>

            {/* Bottom Icons */}
            <div className="px-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">PAGES</h3>
                <nav className="space-y-2">
                    {pageItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <button
                                key={item.name}
                                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </button>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar