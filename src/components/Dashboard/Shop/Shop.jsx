// src/pages/Shop.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Plus, Filter, Monitor, Edit } from "lucide-react";
import { FilterShop } from "./FilterShop";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

export default function Shop() {
    const [shopsData, setShopsData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null); // ✅ new state for menus
    const itemsPerPage = 10;

    useEffect(() => {
        let timer;
        axios
            .get("/shopData.json")
            .then((response) => {
                setShopsData(response.data);
                timer = setTimeout(() => {
                    setLoader(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching shop data:", error);
                timer = setTimeout(() => {
                    setError("Failed to fetch shop data.");
                    setLoader(false);
                }, 2000);
            });

        return () => clearTimeout(timer);
    }, []);

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
            setError("Failed to reset filters.", err);
            setLoader(false);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = shopsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(shopsData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-2 md:px-6 py-2 mt-5">
                    {/* breadcrumb */}
                    <div className="mb-2">
                        <nav className="text-sm text-gray-500">
                            <span className="text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-2 text-gray-400 text-[9px]">/</span>
                            <span className="text-gray-900 text-[10px]">Shops</span>
                        </nav>
                    </div>

                    {/* header */}
                    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-0 md:justify-between md:items-center mb-6">
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
                                    className="flex font-[Roboto] items-center text-[#3040D6] text-[12px] rounded-[3px] border-[#3040D6] hover:bg-[#EDEFF7] bg-transparent w-34 h-7.5"
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

                    {/* table */}
                    <div className="bg-white px-2 py-4 sm:p-4 rounded-lg shadow-sm border border-gray-200">
                        {loader ? (
                            <div
                                className="flex items-center justify-center h-50"
                                aria-live="polite"
                            >
                                <ScaleLoader color="#3040D6" height={50} width={5} radius={2} />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-screen text-red-600 text-sm">
                                {error}
                            </div>
                        ) : (
                            <div className="overflow-x-auto md:overflow-x-hidden">
                                <table className="w-full mb-10 border">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="w-12 px-6 py-2 text-left">
                                                <Checkbox
                                                    checked={selectedItems.length === shopsData.length}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-2 text-left text-[9px] font-[700]">
                                                Name
                                            </th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-[700]">
                                                Id
                                            </th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-[700]">
                                                Username
                                            </th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-[700]">
                                                Profit Share
                                            </th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-[700]">
                                                Logo
                                            </th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-[700]">
                                                Created At
                                            </th>
                                            <th className="w-12 px-6 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((shop) => (
                                            <tr key={shop.id}>
                                                <td className="px-6 py-2">
                                                    <Checkbox
                                                        checked={selectedItems.includes(shop.id)}
                                                        onCheckedChange={(checked) =>
                                                            handleSelectItem(shop.id, checked)
                                                        }
                                                    />
                                                </td>
                                                <td className="px-6 py-2 text-[12px]">
                                                    <Link to={`/shops/${shop.id}`}>{shop.name}</Link>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[12px]">
                                                    <Link to={`/shops/${shop.id}`}>{shop.id}</Link>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[12px]">
                                                    <Link to={`/shops/${shop.id}`}>{shop.username}</Link>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[12px]">
                                                    <Link to={`/shops/${shop.id}`}>
                                                        {shop.profitShare}
                                                    </Link>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[12px]">
                                                    <Link to={`/shops/${shop.id}`}>{shop.logo}</Link>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[12px]">
                                                    <Link to={`/shops/${shop.id}`}>{shop.createdAt}</Link>
                                                </td>
                                                <td className="px-6 py-2">
                                                    <div
                                                        className="relative inline-block group"
                                                        onClick={(e) => e.stopPropagation()} // prevent outside click closing immediately
                                                    >
                                                        <button
                                                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            aria-label="Show more options"
                                                            onClick={() =>
                                                                setOpenMenuId(
                                                                    openMenuId === shop.id ? null : shop.id
                                                                )
                                                            }
                                                        >
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </button>

                                                        {/* dropdown */}
                                                        <div
                                                            className={`absolute ${openMenuId === shop.id
                                                                ? "flex"
                                                                : "hidden group-hover:flex"
                                                                } flex-col bg-white text-black text-center px-2 py-2 rounded-md text-sm top-full -left-6 transform -translate-x-1/2 mt-0 whitespace-nowrap z-100 shadow-md border border-gray-200 space-y-2 transition-opacity duration-200`}
                                                        >
                                                            <Link
                                                                to={`/shops/${shop.id}`}
                                                                className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`View details for shop ${shop.id}`}
                                                            >
                                                                <Monitor className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">
                                                                    Show
                                                                </span>
                                                            </Link>
                                                            <Link
                                                                to={`/shops/edit/${shop.id}`}
                                                                state={{ shop: shop }}
                                                                className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`Edit details for shop ${shop.id}`}
                                                            >
                                                                <Edit className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">
                                                                    Edit
                                                                </span>
                                                            </Link>
                                                        </div>

                                                        {/* arrow */}
                                                        {(openMenuId === shop.id || true) && (
                                                            <span className="absolute hidden group-hover:block w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white top-full left-1/2 transform -translate-x-1/2 -mt-1 z-10"></span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* pagination */}
                                {shopsData.length > itemsPerPage && (
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
