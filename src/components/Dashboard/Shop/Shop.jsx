import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import { shopsData } from "./shopData";

export default function Shop() {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

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

    const handleRowClick = (id) => {
        navigate(`/shops/${id}`);
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
                        </nav>
                    </div>

                    {/* Page Header */}
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
                            // onClick={() => setCurrentView('create')}
                            >
                                <Plus className="h-2 w-2" />
                                <span>Create new</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex border-none shadow-none text-[#3040D6] text-[12px] font-[Roboto] items-center bg-transparent"
                            // onClick={() => setIsFilterOpen(true)}
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
                                        <th className="px-6 py-3 text-left text-[9px] font-[700] text-gray-500 tracking-wider">
                                            <div className="flex items-center space-x-1">
                                                <span>Id</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">
                                            Profit Share
                                        </th>
                                        <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">
                                            Logo
                                        </th>
                                        <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">
                                            Created At
                                        </th>
                                        <th className="w-12 px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {shopsData.map((shop) => (
                                        <tr
                                            key={shop.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <Checkbox
                                                    checked={selectedItems.includes(shop.id)}
                                                    onCheckedChange={(checked) =>
                                                        handleSelectItem(shop.id, checked)
                                                    }
                                                />
                                            </td>

                                            {/* Wrap remaining tds in onClick */}
                                            <td
                                                className="px-6 py-4 text-sm text-gray-900"
                                                onClick={() => handleRowClick(shop.id)}
                                            >
                                                {shop.id}
                                            </td>
                                            <td
                                                className="px-6 py-4 text-sm text-gray-900"
                                                onClick={() => handleRowClick(shop.id)}
                                            >
                                                {shop.username}
                                            </td>
                                            <td
                                                className="px-6 py-4 text-sm text-gray-900"
                                                onClick={() => handleRowClick(shop.id)}
                                            >
                                                {shop.name}
                                            </td>
                                            <td
                                                className="px-6 py-4"
                                                onClick={() => handleRowClick(shop.id)}
                                            >
                                                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                    {shop.profitShare}
                                                </Badge>
                                            </td>
                                            <td
                                                className="px-6 py-4 text-sm text-gray-500"
                                                onClick={() => handleRowClick(shop.id)}
                                            >
                                                {shop.logo}
                                            </td>
                                            <td
                                                className="px-6 py-4 text-sm text-gray-900"
                                                onClick={() => handleRowClick(shop.id)}
                                            >
                                                {shop.createdAt}
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
            </div>
        </div>
    );
}
