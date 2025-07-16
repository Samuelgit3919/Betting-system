

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
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

export default function Shop() {
    const [selectedItems, setSelectedItems] = useState([])

    const shopsData = [
        {
            id: "1192",
            username: "Falco8",
            name: "Falco8",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-14 08:40",
        },
        {
            id: "1180",
            username: "Falco7",
            name: "Falco7",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-13 09:21",
        },
        {
            id: "1171",
            username: "Falco6",
            name: "Falco6",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-11 21:14",
        },
        {
            id: "1164",
            username: "Falco5",
            name: "Falco5",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-11 13:37",
        },
        {
            id: "1163",
            username: "Falco4",
            name: "Falco4",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-11 13:36",
        },
        {
            id: "1162",
            username: "Falco3",
            name: "Falco3",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-11 13:35",
        },
        {
            id: "1161",
            username: "Falco2",
            name: "Falco2",
            profitShare: 20,
            logo: "no image",
            createdAt: "2025-07-11 13:34",
        },
    ]

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(shopsData.map((item) => item.id))
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
           

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
               
              

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="text-sm text-gray-500">
                            <span>Dashboard</span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">Shops</span>
                        </nav>
                    </div>

                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold text-gray-900">List</h1>
                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">21</span>
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
                                            <Checkbox checked={selectedItems.length === shopsData.length} onCheckedChange={handleSelectAll} />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center space-x-1">
                                                <span>Id</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Profit Share
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Logo
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th className="w-12 px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {shopsData.map((shop) => (
                                        <tr key={shop.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <Checkbox
                                                    checked={selectedItems.includes(shop.id)}
                                                    onCheckedChange={(checked) => handleSelectItem(shop.id, checked)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{shop.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{shop.username}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{shop.name}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                    {shop.profitShare}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{shop.logo}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{shop.createdAt}</td>
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
