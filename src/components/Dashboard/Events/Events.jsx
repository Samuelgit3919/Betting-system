
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Home,
    Calendar,
    Store,
    Users,
    FileText,
    Settings,
    MessageCircle,
    BarChart3,
    Plus,
    Filter,
    MoreHorizontal,
    ChevronDown,
} from "lucide-react"

export default function Events() {
    const [selectedItems, setSelectedItems] = useState([])

    const eventsData = [
        {
            id: "102092",
            eventNo: "63567",
            name: "SmartPlayKeno",
            result: "4,15,16,18,21,22,23,24,26,29,34,36,41,42,47,59,61,69,71,79",
            createdAt: "2025-07-16 00:21",
        },
        {
            id: "102091",
            eventNo: "63566",
            name: "SmartPlayKeno",
            result: "6,10,12,22,26,29,33,35,40,48,50,51,54,55,60,64,68,71,72,75",
            createdAt: "2025-07-16 00:17",
        },
        {
            id: "102090",
            eventNo: "63565",
            name: "SmartPlayKeno",
            result: "5,9,18,20,23,24,25,28,44,46,47,48,51,54,56,57,65,67,70,79",
            createdAt: "2025-07-16 00:13",
        },
        {
            id: "102089",
            eventNo: "63564",
            name: "SmartPlayKeno",
            result: "pending",
            createdAt: "2025-07-16 00:10",
        },
        {
            id: "102088",
            eventNo: "63563",
            name: "SmartPlayKeno",
            result: "pending",
            createdAt: "2025-07-16 00:05",
        },
        {
            id: "102087",
            eventNo: "63562",
            name: "SmartPlayKeno",
            result: "2,4,5,9,12,16,19,20,26,27,34,36,42,43,48,52,55,60,63,68",
            createdAt: "2025-07-16 00:01",
        },
        {
            id: "102086",
            eventNo: "63561",
            name: "SmartPlayKeno",
            result: "1,13,14,15,19,23,29,38,39,42,44,47,49,50,54,61,69,70,71,74",
            createdAt: "2025-07-15 23:57",
        },
    ]

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(eventsData.map((item) => item.id))
        } else {
            setSelectedItems([])
        }
    }

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id])
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== id))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Sidebar - Same as dashboard */}
            {/* <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="text-2xl font-bold text-black">
                        <span className="text-green-500">//</span>KiRON<span className="text-green-500">.</span>
                    </div>
                    <div className="text-green-500 text-xs font-medium tracking-wider">interactive</div>
                </div>

                <div className="flex-1 py-6">
                    <div className="px-6 mb-6">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">NAVIGATION</h3>
                        <nav className="space-y-2">
                            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                <Home className="mr-3 h-5 w-5" />
                                Dashboard
                            </button>
                            <button className="w-full flex items-center px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 border-r-2 border-blue-700 rounded-md">
                                <Calendar className="mr-3 h-5 w-5" />
                                Events
                            </button>
                            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                <Store className="mr-3 h-5 w-5" />
                                Shops
                            </button>
                            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                <Users className="mr-3 h-5 w-5" />
                                Cashiers
                            </button>
                            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                <FileText className="mr-3 h-5 w-5" />
                                Bet Slip
                            </button>
                        </nav>
                    </div>

                    <div className="px-6">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">PAGES</h3>
                        <nav className="space-y-2">
                            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                <BarChart3 className="mr-3 h-5 w-5" />
                                Reports
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <div className="flex space-x-3">
                        <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                            <Settings className="h-5 w-5" />
                        </button>
                        <button className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                            <MessageCircle className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                {/* <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-end items-center">
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">Bura</div>
                                <div className="text-xs text-gray-500">Pa</div>
                            </div>
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                B
                            </div>
                        </div>
                    </div>
                </header> */}

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="text-sm text-gray-500">
                            <span>Dashboard</span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">Events</span>
                        </nav>
                    </div>

                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold text-gray-900">List</h1>
                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">100078</span>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                                <Plus className="h-4 w-4" />
                                <span>Create new</span>
                            </Button>
                            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="w-12 px-6 py-3 text-left">
                                            <Checkbox
                                                checked={selectedItems.length === eventsData.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center space-x-1">
                                                <span>Id</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event No
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Result
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th className="w-12 px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {eventsData.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <Checkbox
                                                    checked={selectedItems.includes(event.id)}
                                                    onCheckedChange={(checked) => handleSelectItem(event.id, checked)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{event.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{event.eventNo}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{event.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                                                {event.result === "pending" ? (
                                                    <span className="text-blue-600">pending</span>
                                                ) : (
                                                    <span className="truncate block">{event.result}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{event.createdAt}</td>
                                            <td className="px-6 py-4">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* Floating Message Button */}
                <div className="fixed bottom-6 right-6">
                    <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors">
                        <span className="font-bold text-lg">M</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
