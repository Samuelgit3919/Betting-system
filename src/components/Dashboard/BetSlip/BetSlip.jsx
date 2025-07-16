

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

export default function BetSlip() {
    const [selectedItems, setSelectedItems] = useState([])

    const betSlipData = [
        {
            id: "121129495686842",
            totalStake: 30,
            winAmount: 0,
            winChecked: "Yes",
            status: "Placed",
        },
        {
            id: "121129495686796",
            totalStake: 20,
            winAmount: 0,
            winChecked: "Yes",
            status: "Placed",
        },
        {
            id: "121129495686077",
            totalStake: 30,
            winAmount: 582,
            winChecked: "Yes",
            status: "Redeemed",
        },
        {
            id: "121129495685988",
            totalStake: 10,
            winAmount: 0,
            winChecked: "Yes",
            status: "Placed",
        },
        {
            id: "121129495685945",
            totalStake: 50,
            winAmount: 0,
            winChecked: "Yes",
            status: "Placed",
        },
        {
            id: "121129495685523",
            totalStake: 200,
            winAmount: 0,
            winChecked: "Yes",
            status: "Placed",
        },
        {
            id: "121129495685498",
            totalStake: 40,
            winAmount: 0,
            winChecked: "Yes",
            status: "Placed",
        },
    ]

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(betSlipData.map((item) => item.id))
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
                            <span className="text-gray-900">Bet Slip</span>
                        </nav>
                    </div>

                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold text-gray-900">List</h1>
                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">115581</span>
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
                                                checked={selectedItems.length === betSlipData.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center space-x-1">
                                                <span>betSlip Id</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Stake
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Win Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Win Checked
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="w-12 px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {betSlipData.map((betSlip) => (
                                        <tr key={betSlip.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <Checkbox
                                                    checked={selectedItems.includes(betSlip.id)}
                                                    onCheckedChange={(checked) => handleSelectItem(betSlip.id, checked)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{betSlip.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{betSlip.totalStake}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{betSlip.winAmount}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                    {betSlip.winChecked}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant={betSlip.status === "Redeemed" ? "default" : "secondary"}
                                                    className={
                                                        betSlip.status === "Redeemed" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700"
                                                    }
                                                >
                                                    {betSlip.status}
                                                </Badge>
                                            </td>
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
