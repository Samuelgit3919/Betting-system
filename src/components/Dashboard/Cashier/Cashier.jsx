

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
import { cashiersData as initialCashierData } from "./Cashierdata"
import { Link } from "react-router-dom"
import { FilterCashier } from "./FilterCashier"
import CreateCashier from "./CreateCashier"

export default function Cashier() {
    const [selectedItems, setSelectedItems] = useState([])
    const [CashierData, setCashierData] = useState(initialCashierData);
    const [currentView, setCurrentView] = useState("list");

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });





    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(CashierData.map((item) => item.id))
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

    const handleAddCashier = (newCashier) => {
        const newId = (parseInt(CashierData[0]?.id || "1000") + 1).toString();
        const createdAt = new Date().toISOString().slice(0, 10);
        const newCashierData = {
            id: newId,
            createdAt,
            ...newCashier,
        };
        setCashierData((prev) => [newCashierData, ...prev]);
    };
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        const filteredData = initialCashierData.filter((shop) =>
            shop.name.toLowerCase().includes(newFilters.name.toLowerCase())
        );
        setCashierData(filteredData);
    };

    const handleResetFilters = () => {
        setFilters({ name: "" });
        setCashierData(initialCashierData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Page Content */}
                <main className="flex-1 p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="text-[11px]">
                            <span className="text-[12px]">Dashboard</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-gray-900 text-[13px]">Cashiers</span>
                            {currentView === 'create' && (
                                <>
                                    <span className="mx-2 text-gray-400">/</span>
                                    <span className="text-gray-900 text-[13px]">Create new</span>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Page Header */}
                    {currentView === 'list' && (
                        <>

                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                                    <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">{CashierData.length}</span>
                                </div>
                                <div className="flex items-center justify-center space-x-5">
                                    <Button
                                        variant="outline"
                                        className="flex font-[Roboto] items-center text-[#3040D6] text-[12px] rounded-[3px] border-[#3040D6] bg-transparent w-34 h-7.5"
                                        onClick={() => setCurrentView('create')}
                                    >
                                        <Plus className="h-2 w-2" />
                                        <span>Create new</span>
                                    </Button>
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



                            <div className="bg-white p-4 border-none rounded-lg shadow-sm border border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="w-full border">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="w-12 px-3 py-3 text-left">
                                                    <Checkbox
                                                        checked={selectedItems.length === CashierData.length}
                                                        onCheckedChange={handleSelectAll}
                                                        className={"border"}
                                                    />
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-[11px] font-medium  tracking-wider">
                                                    <div className="flex items-center space-x-2">
                                                        <span>Id</span>
                                                        <ChevronDown className="h-3 w-3 text-gray-400" />
                                                    </div>
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Username
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Active
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Is Supervisor
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Cash Limit
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Cash Today
                                                </th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[500]  tracking-wider">
                                                    Created At
                                                </th>
                                                <th className="w-12 px-6 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {CashierData.map((cashier) => (
                                                <tr key={cashier.id} className="hover:bg-gray-50">
                                                    <td className="px-3 py-4">
                                                        <Checkbox
                                                            checked={selectedItems.includes(cashier.id)}
                                                            onCheckedChange={(checked) => handleSelectItem(cashier.id, checked)}
                                                        />
                                                    </td>
                                                    <td className="px-1 py-4 text-[11px] text-gray-900">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            {cashier.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4 text-[11px] text-gray-900">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            {cashier.id}
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4 text-[11px] text-gray-900">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            {cashier.username}
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4">
                                                        <Link to={`/cashier/${cashier.d}`}>
                                                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                                {cashier.active}
                                                            </Badge>
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                                {cashier.isSupervisor}
                                                            </Badge>
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4 text-[11px] text-gray-900">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            {cashier.cashLimit.toLocaleString()}
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4 text-[11px] text-gray-900">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            <span
                                                                className={
                                                                    cashier.cashToday < 0 ? "text-red-600" : cashier.cashToday > 0 ? "text-green-600" : ""
                                                                }
                                                            >
                                                                {cashier.cashToday}
                                                            </span>
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 py-4 text-[11px] text-gray-900">
                                                        <Link to={`/cashier/${cashier.id}`}>
                                                            {cashier.createdAt}
                                                        </Link>
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
                        </>
                    )}

                    {currentView === 'create' && (
                        <CreateCashier setCurrentView={setCurrentView} onSave={handleAddCashier} />
                    )}

                    <FilterCashier

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
