import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Plus, Filter } from "lucide-react";
import { shopsData as initialShopsData } from "./shopData";
import { CreateNewShop } from "./CreateNewShop";
import { FilterShop } from "./FilterShop";

export default function Shop() {
    const [shopsData, setShopsData] = useState(initialShopsData);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentView, setCurrentView] = useState("list");

    // Filter states
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(shopsData.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        }
    };

    const handleAddShop = (newShop) => {
        const newId = (parseInt(shopsData[0]?.id || "1000") + 1).toString();
        const createdAt = new Date().toISOString().slice(0, 10);
        const newShopData = {
            id: newId,
            createdAt,
            ...newShop,
        };
        setShopsData((prev) => [newShopData, ...prev]);
    };

    // Apply filters
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        const filteredData = initialShopsData.filter((shop) =>
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
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="text-sm text-gray-500">
                            <span className="text-[12px]">Dashboard</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-gray-900 text-[13px]">Shops</span>
                            {currentView === 'create' && (
                                <>
                                    <span className="mx-2 text-gray-400">/</span>
                                    <span className="text-gray-900 text-[13px]">Create new</span>
                                </>
                            )}
                        </nav>
                    </div>

                    {currentView === 'list' && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                                    <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">
                                        {shopsData.length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center space-x-5">
                                    <Button
                                        variant="outline"
                                        className="flex font-[Roboto] items-center text-[#3040D6] text-[12px] rounded-[3px] border-[#3040D6] bg-transparent w-34 h-7.5"
                                        onClick={() => setCurrentView("create")}
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

                            {/* Data Table */}
                            <div className="bg-white p-4 border-none rounded-lg shadow-sm border border-gray-200">
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
                                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">Id</th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">Username</th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">Profit Share</th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">Logo</th>
                                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">Created At</th>

                                                <th className="w-12 px-6 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {shopsData.map((shop) => (
                                                <tr key={shop.id}>
                                                    <td className="px-6 py-4">
                                                        <Checkbox
                                                            checked={selectedItems.includes(shop.id)}
                                                            onCheckedChange={(checked) => handleSelectItem(shop.id, checked)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-[12px]">{shop.id}</td>
                                                    <td className="px-6 py-4 text-[12px]">{shop.username}</td>
                                                    <td className="px-6 py-4 text-[12px]">{shop.name}</td>
                                                    <td className="px-6 py-4 text-[12px]">{shop.profitShare}</td>
                                                    <td className="px-6 py-4 text-[12px]">{shop.logo}</td>
                                                    <td className="px-6 py-4 text-[12px]">{shop.createdAt}</td>
                                                    <td className="px-6 py-4">
                                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
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
                        <CreateNewShop setCurrentView={setCurrentView} onSave={handleAddShop} />
                    )}

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
