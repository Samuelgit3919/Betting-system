

// import { useState } from "react"
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
import { betSlipData as initialShopsData } from "./Bet"
import { Link } from "react-router-dom"
import { useState } from "react"
import { BetFilter } from "./BetFilter"

export default function BetSlip() {
    // Filter states
    const [shopsData, setShopsData] = useState(initialShopsData);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });


    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        const filteredData = shopsData.filter((shop) =>
            shop.name.toLowerCase().includes(newFilters.name.toLowerCase())
        );
        setShopsData(filteredData);
    };

    // Reset filters
    const handleResetFilters = () => {
        setFilters({ name: "" });
        setShopsData(initialShopsData);
    };



    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Page Content */}
                <main className="flex-1 p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex justify-between items-center border[#3040D6]">
                        <nav className="text-sm text-gray-500">
                            <span>Dashboard</span>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">Bet Slip</span>
                        </nav>
                        <Button className="bg-[] cursor-pointer border border-[#3040D6]  rounded-[8px] h-5 hover:bg-[#EDEFF7]">
                            <span className="text-[9px] text-[#3040D6]">
                                Export
                            </span>
                        </Button>
                    </div>

                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-[Sans-serif]text-gray-900">List</h1>
                            <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">115581</span>
                        </div>
                        <div className="flex items-center justify-center space-x-5">

                            <div className="flex items-center justify-center space-x-5">

                                <Button
                                    variant="outline"
                                    className="flex border-none shadow-none text-[#3040D6] text-[12px] font-[Roboto] items-center bg-transparent"
                                    onClick={() => setIsFilterOpen(true)}
                                >
                                    <Filter className="h-2 w-2" />
                                    <span>Filter</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white p-4 border-none rounded-lg shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full border">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>

                                        <th className="px-6 py-3 text-left text-[9px] font-[700] text-gray-500  tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <span>betSlip Id</span>
                                                <ChevronDown className="h-3 w-3" />
                                            </div>
                                        </th>
                                        <th className=" py-3 text-left text-[10px] font-[700]  tracking-wider">
                                            Total Stake
                                        </th>
                                        <th className=" py-3 text-left text-[10px] font-[700]  tracking-wider">
                                            Win Amount
                                        </th>
                                        <th className=" py-3 text-left text-[10px] font-[700]  tracking-wider">
                                            Win Checked
                                        </th>
                                        <th className=" py-3 text-left text-[10px] font-[700]  tracking-wider">
                                            Status
                                        </th>
                                        <th className=" py-3 text-left text-[10px] font-[700]  tracking-wider">
                                            Created At</th>
                                        <th className="w-12  py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {shopsData.map((betSlip) => (
                                        <tr key={betSlip.id} className="hover:bg-gray-50">
                                            <td className="pl-6 py-4 text-[12px] text-gray-900">
                                                <Link to={`/betSlip/${betSlip.id}`}>
                                                    {betSlip.id}
                                                </Link>
                                            </td>
                                            <td className="px-1 py-4 text-[12px] text-gray-900">{betSlip.totalStake}</td>
                                            <td className="px-1 py-4 text-[12px] text-gray-900">{betSlip.winAmount}</td>
                                            <td className="px-1 py-4">
                                                <Badge className="text-gray-700 bg-transparent border border-gray-200 rounded-full text-[10px] flex items-center justify-center">
                                                    {betSlip.winChecked}
                                                </Badge>
                                            </td>
                                            <td className="px-1 py-4">
                                                <Badge
                                                    variant={betSlip.status === "Redeemed" ? "default" : "secondary"}
                                                    className="bg-[#BBC3CB] text-white text-[10px] rounded-md flex items-center justify-center"
                                                >
                                                    {betSlip.status}
                                                </Badge>
                                            </td>
                                            <td className="px-1 py-4 text-[12px] text-gray-900">
                                                <Badge className="text-gray-700 bg-transparent">

                                                    {betSlip.createdAt}
                                                </Badge>
                                            </td>
                                            <td className="px-1 py-4">
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
                    {/* Filter Sheet */}
                    <BetFilter
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        onApplyFilters={handleApplyFilters}
                        onResetFilters={handleResetFilters}
                        initialFilters={filters}
                    />
                </main>
            </div>
        </div>
    )
}
