import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, MoreHorizontal, ChevronDown, Monitor, Edit, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { FilterCashier } from "./FilterCashier";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

export default function Cashier() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [cashierData, setCashierData] = useState([]);
    const [originalCashierData, setOriginalCashierData] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null);
    const itemsPerPage = 10;

    // Fetch data from public folder
    useEffect(() => {
        let timer;

        axios.get("/cashierData.json")
            .then((response) => {
                setCashierData(response.data);
                setOriginalCashierData(response.data);
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching event data:", error);
                setError("Failed to load data. Please try again later.");
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });
        // Cleanup timer if component unmounts
        return () => clearTimeout(timer);
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
        const filteredData = originalCashierData.filter((shop) =>
            shop.name.toLowerCase().includes(newFilters.name.toLowerCase())
        );
        setCashierData(filteredData);
        setCurrentPage(1); // Reset to first page when filters are applied
    };

    const handleResetFilters = () => {
        setFilters({ name: "" });
        setCashierData(originalCashierData); // Reset to original data
        setCurrentPage(1); // Reset to first page when filters are reset
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cashierData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cashierData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-2 md:px-6 py-2 mt-5">
                    {/* Breadcrumb */}
                    <div className="mb-2">
                        <nav>
                            <span className="text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-2 text-gray-400 text-[9px]">/</span>
                            <span className="text-gray-900 text-[10px]">Cashiers</span>
                        </nav>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-0 md:justify-between md:items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                            <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">
                                {cashierData.length}
                            </span>
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

                    <div className="bg-white px-2 py-4 sm:p-4 border-none mb-18 rounded-lg shadow-sm border border-gray-200">
                        {loading ? (
                            <div className="flex items-center justify-center h-50" aria-live="polite">
                                <ScaleLoader color="#3040D6" height={50} width={5} radius={2} />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-screen text-red-600 text-sm">
                                {error}
                            </div>
                        ) : (
                            <div className="overflow-x-auto sm:overflow-x-hidden mb-8">
                                <table className="w-full border mb-14">
                                    <thead className="bg-gray-50 border-gray-200">
                                        <tr>
                                            {/* Checkbox column - visible on all screen sizes */}
                                            <th className="w-12 px-3 py-3 text-left">
                                                <Checkbox
                                                    checked={selectedItems.length === cashierData.length && cashierData.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                    className={"border"}
                                                />
                                            </th>
                                            {/* Id column - visible on all screen sizes */}
                                            <th className="sm:table-cell hidden py-1 text-left text-[11px] font-medium tracking-wider">
                                                <div className="items-center flex space-x-2">
                                                    <span>Id</span>
                                                    <ChevronDown className="h-3 w-3 text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="py-1 text-left text-[9px] font-[500] tracking-wider">Name</th>
                                            {/* Other columns - hidden on mobile, visible on sm and above */}
                                            <th className="sm:table-cell hidden py-2.5 text-left text-[9px] font-[500] tracking-wider">
                                                Username
                                            </th>
                                            <th className="sm:table-cell hidden py-2.5 text-left text-[9px] font-[500] tracking-wider">
                                                Active
                                            </th>
                                            <th className="sm:table-cell hidden py-2.5 text-left text-[9px] font-[500] tracking-wider">
                                                Is Supervisor
                                            </th>
                                            <th className="sm:table-cell hidden py-2.5 text-left text-[9px] font-[500] tracking-wider">
                                                Cash Limit
                                            </th>
                                            <th className="sm:table-cell hidden py-2.5 text-left text-[9px] font-[500] tracking-wider">
                                                Cash Today
                                            </th>
                                            <th className="sm:table-cell hidden py-2.5 text-left text-[9px] font-[500] tracking-wider">
                                                Created At
                                            </th>
                                            <th className="w-12 px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((cashier) => (
                                            <tr key={cashier.id} className="hover:bg-gray-50">
                                                {/* Checkbox column - visible on all screen sizes */}
                                                <td className="px-3 py-2.5">
                                                    <Checkbox
                                                        checked={selectedItems.includes(cashier.id)}
                                                        onCheckedChange={(checked) => handleSelectItem(cashier.id, checked)}
                                                    />
                                                </td>

                                                <td className="sm:table-cell hidden py-2.5 text-[11px] text-gray-900">
                                                    <Link to={`/cashier/${cashier.id}`}>{cashier.id}</Link>
                                                </td>

                                                <td className="py-2.5 text-[11px] text-gray-900">
                                                    <Link to={`/cashier/${cashier.id}`}>{cashier.name}</Link>
                                                </td>

                                                <td className="sm:table-cell hidden py-2.5 text-[11px] text-gray-900">
                                                    <Link to={`/cashier/${cashier.id}`}>{cashier.username}</Link>
                                                </td>
                                                <td className="sm:table-cell hidden py-2.5">
                                                    <Link to={`/cashier/${cashier.id}`}>
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                            {cashier.active}
                                                        </Badge>
                                                    </Link>
                                                </td>
                                                <td className="sm:table-cell hidden py-2.5">
                                                    <Link to={`/cashier/${cashier.id}`}>
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                            {cashier.isSupervisor}
                                                        </Badge>
                                                    </Link>
                                                </td>
                                                <td className="sm:table-cell hidden py-2.5 text-[11px] text-gray-900">
                                                    <Link to={`/cashier/${cashier.id}`}>
                                                        {cashier.cashLimit?.toLocaleString()}
                                                    </Link>
                                                </td>
                                                <td className="sm:table-cell hidden py-2.5 text-[11px] text-gray-900">
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
                                                <td className="sm:table-cell hidden px-1 py-2.5 text-[11px] text-gray-900">
                                                    <Link to={`/cashier/${cashier.id}`}>
                                                        {cashier.createdAt}
                                                    </Link>
                                                </td>
                                                <td className="px-1 py-2.5">
                                                    <div className="relative inline-block group">
                                                        <button
                                                            className="text-gray-400 hover:text-gray-600 focus:outline-none "
                                                            aria-label="Show more options"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setOpenMenuId(openMenuId === cashier.id ? null : cashier.id)
                                                            }}
                                                        >
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </button>
                                                        {(openMenuId === cashier.id) && (
                                                            <div className="absolute flex flex-col bg-white text-black text-center px-2 py-2 rounded-md text-sm top-full -left-8 transform -translate-x-1/2 mt-0.5 whitespace-nowrap z-100 shadow-md border border-gray-200 space-y-2 transition-opacity duration-200">
                                                                <Link
                                                                    to={`/cashier/${cashier.id}`}
                                                                    className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    aria-label={`View details for cashier ${cashier.id}`}
                                                                >
                                                                    <Monitor className="h-3 w-3 text-gray-700" />
                                                                    <span className="font-normal text-[11px]">Show</span>
                                                                </Link>
                                                                <Link
                                                                    to={`/cashiers/edit/${cashier.id}`}
                                                                    state={{ cashier: cashier }}
                                                                    className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    aria-label={`Edit details for cashier ${cashier.id}`}
                                                                >
                                                                    <Edit className="h-3 w-3 text-gray-700" />
                                                                    <span className="font-normal text-[11px]">Edit</span>
                                                                </Link>
                                                                <Link
                                                                    to={`/shops/edit/${cashier.id}`}
                                                                    state={{ shop: cashier }}
                                                                    className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    aria-label={`Adjust balance for shop ${cashier.id}`}
                                                                >
                                                                    <Ban className="h-3 w-3 text-gray-700" />
                                                                    <span className="font-normal text-[11px]">Adjust Balance</span>
                                                                </Link>
                                                            </div>
                                                        )}
                                                        <div className="absolute hidden group-hover:flex flex-col bg-white text-black text-center px-2 py-2 rounded-md text-sm top-full -left-8 transform -translate-x-1/2 mt-0.5 whitespace-nowrap z-100 shadow-md border border-gray-200 space-y-2 transition-opacity duration-200">
                                                            <Link
                                                                to={`/cashier/${cashier.id}`}
                                                                className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`View details for cashier ${cashier.id}`}
                                                            >
                                                                <Monitor className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">Show</span>
                                                            </Link>
                                                            <Link
                                                                to={`/cashiers/edit/${cashier.id}`}
                                                                state={{ cashier: cashier }}
                                                                className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`Edit details for cashier ${cashier.id}`}
                                                            >
                                                                <Edit className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">Edit</span>
                                                            </Link>
                                                            <Link
                                                                to={`/shops/edit/${cashier.id}`}
                                                                state={{ shop: cashier }}
                                                                className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`Adjust balance for shop ${cashier.id}`}
                                                            >
                                                                <Ban className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">Adjust Balance</span>
                                                            </Link>
                                                        </div>
                                                        <span className="absolute hidden group-hover:block w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white top-full left-1/2 transform -translate-x-1/2 -mt-1 z-10"></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* pagination */}
                                {cashierData.length > itemsPerPage && (
                                    <div className="flex justify-center items-center space-x-1 mt-2 p-2 ">
                                        {/* First Page */}
                                        <Link
                                            variant="outline"
                                            onClick={() => handlePageChange(1)}
                                            disabled={currentPage === 1}
                                            className="h-8 w-8 p-0 text-blue-600 "
                                        >
                                            ⏮
                                        </Link>

                                        {/* Previous */}
                                        <Link
                                            variant="outline"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="h-8 w-8 p-0 text-blue-600 "
                                        >
                                            ‹
                                        </Link>

                                        {/* Dynamic Page Numbers with Ellipsis */}
                                        {(() => {
                                            const pageButtons = [];
                                            const maxVisiblePages = 5; // Show current page + 2 before and 2 after
                                            let startPage = Math.max(1, currentPage - 2);
                                            let endPage = Math.min(totalPages, currentPage + 2);

                                            if (endPage - startPage < maxVisiblePages - 1) {
                                                if (startPage === 1) {
                                                    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                                                } else if (endPage === totalPages) {
                                                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                                                }
                                            }

                                            // Add ellipsis if not starting from page 1
                                            if (startPage > 1) {
                                                pageButtons.push(
                                                    <Link
                                                        key="start-ellipsis"
                                                        variant="outline"
                                                        className="h-8 w-8 p-0 text-blue-600 "
                                                        onClick={() => handlePageChange(1)}
                                                    >
                                                        1
                                                    </Link>
                                                );
                                                if (startPage > 2) {
                                                    pageButtons.push(
                                                        <span
                                                            key="start-ellipsis-dot"
                                                            className="text-[12px] px-2 py-1 text-gray-500"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                            }

                                            // Add page numbers
                                            for (let i = startPage; i <= endPage; i++) {
                                                pageButtons.push(
                                                    <Link
                                                        key={i}
                                                        variant={currentPage === i ? "default" : "outline"}
                                                        onClick={() => handlePageChange(i)}
                                                        className={`h-8 w-8 p-0 text-sm ${currentPage === i
                                                            ? " text-blue-600"
                                                            : "text-blue-600 "
                                                            } rounded-md`}
                                                    >
                                                        {i}
                                                    </Link>
                                                );
                                            }

                                            // Add ellipsis if not ending at totalPages
                                            if (endPage < totalPages) {
                                                if (endPage < totalPages - 1) {
                                                    pageButtons.push(
                                                        <span
                                                            key="end-ellipsis-dot"
                                                            className="text-[12px] px-2 py-1 text-gray-500"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                pageButtons.push(
                                                    <Link
                                                        key="end-page"
                                                        variant="outline"
                                                        className="h-8 w-8 p-0 text-blue-600 "
                                                        onClick={() => handlePageChange(totalPages)}
                                                    >
                                                        {totalPages}
                                                    </Link>
                                                );
                                            }

                                            return pageButtons;
                                        })()}

                                        {/* Next */}
                                        <Link
                                            variant="outline"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="h-8 w-8 p-0 text-blue-600 "
                                        >
                                            ›
                                        </Link>

                                        {/* Last Page */}
                                        <Link
                                            variant="outline"
                                            onClick={() => handlePageChange(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="h-8 w-8 p-0 text-blue-600 "
                                        >
                                            ⏭
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

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
    );
}