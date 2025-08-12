import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Plus, Filter } from "lucide-react";
import { FilterShop } from "./FilterShop";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Shop() {
    const [shopsData, setShopsData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    // Fetch mock data from public folder
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                const response = await fetch("/shopData.json");
                if (!response.ok) throw new Error("Failed to fetch shops data.");
                const data = await response.json();
                setShopsData(data);
                setLoader(false);
            } catch (err) {
                setError(err.message);
                setLoader(false);
            }
        };
        fetchData();
    }, []);

    // Select all
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(shopsData.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    // Select individual
    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        }
    };

    // Apply filters
    const handleApplyFilters = async (newFilters) => {
        try {
            setLoader(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setFilters(newFilters);
            const response = await fetch("/shopData.json");
            const allData = await response.json();
            const filteredData = allData.filter((shop) =>
                shop.name.toLowerCase().includes(newFilters.name.toLowerCase())
            );
            setShopsData(filteredData);
            setIsFilterOpen(false);
            setLoader(false);
        } catch (err) {
            setError("Failed to apply filters.");
            setLoader(false);
        }
    };

    // Reset filters
    const handleResetFilters = async () => {
        try {
            setLoader(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setFilters({ name: "" });
            const response = await fetch("/shopData.json");
            const data = await response.json();
            setShopsData(data);
            setIsFilterOpen(false);
            setLoader(false);
        } catch (err) {
            setError("Failed to reset filters.");
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col">

                <main className="flex-1 px-6 py-2">
                    {/* Breadcrumb */}
                    <div className="mb-2">
                        <nav className="text-sm text-gray-500">
                            <span className="text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-2 text-gray-400 text-[9px]">/</span>
                            <span className="text-gray-900 text-[10px]">Shops</span>
                        </nav>
                    </div>

                    {/* List Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                            <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">
                                {shopsData.length}
                            </span>
                        </div>
                        <div className="flex items-center justify-center space-x-5">
                            <Link to="createShop">
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

                    {/* Data Table */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        {
                            loader ? (
                                <div className="flex items-center justify-center h-50 " aria-live="polite">
                                    <ScaleLoader color="#3040D6" height={50} width={5} radius={2} />
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center h-screen text-red-600 text-sm">{error}</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="w-12 px-6 py-3 text-left">
                                                    <Checkbox
                                                        checked={selectedItems.length === shopsData.length}
                                                        onCheckedChange={handleSelectAll}
                                                    />
                                                </th>
                                                <th className="px-6 py-3 text-left text-[9px] font-[700]">Id</th>
                                                <th className="px-6 py-3 text-left text-[9px] font-[700]">Username</th>
                                                <th className="px-6 py-3 text-left text-[9px] font-[700]">Name</th>
                                                <th className="px-6 py-3 text-left text-[9px] font-[700]">Profit Share</th>
                                                <th className="px-6 py-3 text-left text-[9px] font-[700]">Logo</th>
                                                <th className="px-6 py-3 text-left text-[9px] font-[700]">Created At</th>
                                                <th className="w-12 px-6 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {shopsData.map((shop) => (
                                                <tr key={shop.id}>
                                                    <td className="px-6 py-4">
                                                        <Checkbox
                                                            checked={selectedItems.includes(shop.id)}
                                                            onCheckedChange={(checked) =>
                                                                handleSelectItem(shop.id, checked)
                                                            }
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">
                                                        <Link to={`/shops/${shop.id}`}>{shop.id}</Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">
                                                        <Link to={`/shops/${shop.id}`}>{shop.username}</Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">
                                                        <Link to={`/shops/${shop.id}`}>{shop.name}</Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">
                                                        <Link to={`/shops/${shop.id}`}>{shop.profitShare}</Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">
                                                        <Link to={`/shops/${shop.id}`}>{shop.logo}</Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">
                                                        <Link to={`/shops/${shop.id}`}>{shop.createdAt}</Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }

                    </div>

                    {/* Filter Sheet */}
                    <FilterShop
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        onApplyFilters={handleApplyFilters}
                        onResetFilters={handleResetFilters}
                        initialFilters={filters}
                    />
                </main>

            </div>
        </div>
    );
}
