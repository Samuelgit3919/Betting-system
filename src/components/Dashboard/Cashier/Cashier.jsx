import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { FilterCashier } from "./FilterCashier";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Cashier() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [cashierData, setCashierData] = useState([]);
    const [initialCashierData, setInitialCashierData] = useState([]);
    const [currentView, setCurrentView] = useState("list");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Fetch data from public folder
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/cashierData.json");
                if (!response.ok) throw new Error("Failed to fetch shops data.");
                const data = await response.json();
                setCashierData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(cashierData.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, id]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item !== id));
        }
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
        <div className="min-h-screen bg-gray-50 flex ">
            <div className="flex-1 flex flex-col">

                <main className="flex-1 px-6 py-2">
                    {/* Breadcrumb */}
                    <div className="mb-2">
                        <nav>
                            <span className="text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-2 text-gray-400 text-[9px]">/</span>
                            <span className="text-gray-900 text-[10px]">Cashiers</span>
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
                                    <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">{cashierData.length}</span>
                                </div>
                                <div className="flex items-center justify-center space-x-5">
                                    <Link to="createCashier">
                                        <Button
                                            variant="outline"
                                            className="flex font-[Roboto] items-center text-[#3040D6] text-[12px] rounded-[3px] border-[#3040D6] bg-transparent w-34 h-7.5"
                                        >
                                            <Plus className="h-2 w-2" />
                                            <span>Create new</span>
                                        </Button>
                                    </Link>
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
                                {
                                    loading ? (
                                        <div className="flex items-center justify-center h-50" aria-live="polite">
                                            <ScaleLoader color="#3040D6" height={50} width={5} radius={2} />
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full border">
                                                <thead className="bg-gray-50 border-b border-gray-200">
                                                    <tr>
                                                        <th className="w-12 px-3 py-3 text-left">
                                                            <Checkbox
                                                                checked={selectedItems.length === cashierData.length && cashierData.length > 0}
                                                                onCheckedChange={handleSelectAll}
                                                                className={"border"}
                                                            />
                                                        </th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Name</th>
                                                        <th className=" py-3 text-left text-[11px] font-medium tracking-wider">
                                                            <div className="flex items-center space-x-2">
                                                                <span>Id</span>
                                                                <ChevronDown className="h-3 w-3 text-gray-400" />
                                                            </div>
                                                        </th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Username</th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Active</th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Is Supervisor</th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Cash Limit</th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Cash Today</th>
                                                        <th className=" py-3 text-left text-[9px] font-[500] tracking-wider">Created At</th>
                                                        <th className="w-12 px-6 py-3"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {cashierData.map((cashier) => (
                                                        <tr key={cashier.id} className="hover:bg-gray-50">
                                                            <td className="px-3 py-4">
                                                                <Checkbox
                                                                    checked={selectedItems.includes(cashier.id)}
                                                                    onCheckedChange={(checked) => handleSelectItem(cashier.id, checked)}
                                                                />
                                                            </td>
                                                            <td className=" py-4 text-[11px] text-gray-900">
                                                                <Link to={`/cashier/${cashier.id}`}>{cashier.name}</Link>
                                                            </td>
                                                            <td className=" py-4 text-[11px] text-gray-900">
                                                                <Link to={`/cashier/${cashier.id}`}>{cashier.id}</Link>
                                                            </td>
                                                            <td className=" py-4 text-[11px] text-gray-900">
                                                                <Link to={`/cashier/${cashier.id}`}>{cashier.username}</Link>
                                                            </td>
                                                            <td className=" py-4">
                                                                <Link to={`/cashier/${cashier.id}`}>
                                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                                        {cashier.active}
                                                                    </Badge>
                                                                </Link>
                                                            </td>
                                                            <td className=" py-4">
                                                                <Link to={`/cashier/${cashier.id}`}>
                                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                                        {cashier.isSupervisor}
                                                                    </Badge>
                                                                </Link>
                                                            </td>
                                                            <td className=" py-4 text-[11px] text-gray-900">
                                                                <Link to={`/cashier/${cashier.id}`}>
                                                                    {cashier.cashLimit?.toLocaleString()}
                                                                </Link>
                                                            </td>
                                                            <td className=" py-4 text-[11px] text-gray-900">
                                                                <Link to={`/cashier/${cashier.id}`}>
                                                                    <span
                                                                        className={
                                                                            cashier.cashToday < 0
                                                                                ? "text-red-600"
                                                                                : cashier.cashToday > 0
                                                                                    ? "text-green-600"
                                                                                    : ""
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
                                    )
                                }

                            </div>
                        </>
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

        </div >
    );
}
