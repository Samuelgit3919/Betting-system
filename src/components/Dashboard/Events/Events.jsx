
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Filter, MoreHorizontal, ChevronDown, Monitor } from "lucide-react"
import { Link } from "react-router-dom"
import { FilterPanel } from "./FilterPanel"
import ScaleLoader from "react-spinners/ScaleLoader"
import axios from "axios"

export default function Events() {
    const [eventsData, setEventsData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters, setFilters] = useState({
        id: "",
        name: "",
        eventNo: "",
        result: "",
        createdFrom: "",
        createdTo: "",
        updatedFrom: "",
        updatedTo: "",
    })
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [openMenuId, setOpenMenuId] = useState(null) // 👈 New state for dropdown
    const itemsPerPage = 10

    // Fetch events data
    useEffect(() => {
        let timer
        axios.get("/eventData.json")
            .then((response) => {
                setEventsData(response.data)
                timer = setTimeout(() => setLoading(false), 2000)
            })
            .catch((error) => {
                console.error("Error fetching event data:", error)
                timer = setTimeout(() => setLoading(false), 2000)
            })
        return () => clearTimeout(timer)
    }, [])

    // Select all checkbox
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(eventsData.map((item) => item.id))
        } else {
            setSelectedItems([])
        }
    }

    // Select single checkbox
    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, id])
        } else {
            setSelectedItems((prev) => prev.filter((item) => item !== id))
        }
    }

    // Apply filters
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters)
        let filtered = [...eventsData]

        if (newFilters.id) {
            filtered = filtered.filter((e) => e.id.includes(newFilters.id))
        }
        if (newFilters.name) {
            filtered = filtered.filter((e) => e.name.toLowerCase().includes(newFilters.name.toLowerCase()))
        }
        if (newFilters.eventNo) {
            filtered = filtered.filter((e) => e.eventNo.includes(newFilters.eventNo))
        }
        if (newFilters.result) {
            filtered = filtered.filter((e) => e.result.toLowerCase().includes(newFilters.result.toLowerCase()))
        }
        if (newFilters.createdFrom) {
            filtered = filtered.filter((e) => e.createdAt >= newFilters.createdFrom)
        }
        if (newFilters.createdTo) {
            filtered = filtered.filter((e) => e.createdAt <= newFilters.createdTo)
        }

        setEventsData(filtered)
        setCurrentPage(1)
    }

    // Reset filters
    const handleResetFilters = () => {
        setFilters({
            id: "",
            name: "",
            eventNo: "",
            result: "",
            createdFrom: "",
            createdTo: "",
            updatedFrom: "",
            updatedTo: "",
        })
        setEventsData(eventsData)
        setCurrentPage(1)
    }

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = eventsData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(eventsData.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-2 md:px-6 py-2 mt-5 max-w-full">
                    {/* Breadcrumb */}
                    <div className="mb-2">
                        <nav className="text-[10px] sm:text-[11px] flex items-center space-x-1">
                            <span className="text-[9px] sm:text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-1 sm:mx-2 text-gray-400 text-[8px] sm:text-[9px]">/</span>
                            <span className="text-gray-900 text-[9px] sm:text-[10px]">Events</span>
                        </nav>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-0 md:justify-between md:items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                            <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">
                                {eventsData.length}
                            </span>
                        </div>
                        <div className="flex items-center justify-center space-x-5">
                            <Link to="createEvent">
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

                    {/* Table */}
                    <div className="bg-white px-2 py-4 sm:p-4 border-none rounded-lg shadow-sm border border-gray-200">
                        {loading ? (
                            <div className="flex items-center justify-center h-40 sm:h-50" aria-live="polite">
                                <ScaleLoader color="#3040D6" height={40} sm:height={50} width={4} sm:width={5} radius={2} />
                            </div>
                        ) : (
                            <div className="overflow-x-auto md:overflow-x-hidden">
                                <table className="w-full border mb-6">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="w-12 px-4 py-2 text-left">
                                                <Checkbox
                                                    checked={selectedItems.length === eventsData.length && eventsData.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-[9px] font-medium tracking-wider">
                                                <div className="flex items-center space-x-2">
                                                    <span>Id</span>
                                                    <ChevronDown className="h-3 w-3 text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-medium tracking-wider">Event No</th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-medium tracking-wider">Name</th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-medium tracking-wider">Result</th>
                                            <th className="sm:table-cell hidden px-6 py-2 text-left text-[9px] font-medium tracking-wider">Created At</th>
                                            <th className=" w-12 px-6 py-2"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((event) => (
                                            <tr key={event.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2">
                                                    <Checkbox
                                                        checked={selectedItems.includes(event.id)}
                                                        onCheckedChange={(checked) => handleSelectItem(event.id, checked)}
                                                    />
                                                </td>
                                                <td className="px-6 py-2 text-[11px] text-gray-900">
                                                    <Link to={`/events/${event.id}`}>{event.id}</Link>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[11px] text-gray-900">{event.eventNo}</td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[11px] text-gray-900">{event.name}</td>
                                                <td className="sm:table-cell hidden px-6 py-2">
                                                    <Badge
                                                        variant="secondary"
                                                        className={
                                                            event.result === "pending"
                                                                ? ""
                                                                : event.result === "success"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                        }
                                                    >
                                                        {event.result}
                                                    </Badge>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-2 text-[11px] text-gray-900">{event.createdAt}</td>
                                                <td className="px-6 py-2">
                                                    <div className="relative inline-block group">
                                                        <button
                                                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            aria-label="Show more options"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setOpenMenuId(openMenuId === event.id ? null : event.id)
                                                            }}
                                                        >
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </button>

                                                        {(openMenuId === event.id) && (
                                                            <div className="absolute flex flex-col bg-white text-black text-center px-2 py-2 rounded-md text-sm top-full -left-3 transform -translate-x-1/2 mt-0 whitespace-nowrap z-100 shadow-md border border-gray-200 space-y-2 transition-opacity duration-200">
                                                                <Link
                                                                    to={`/events/${event.id}`}
                                                                    className="flex items-center space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    aria-label={`View details for event ${event.id}`}
                                                                >
                                                                    <Monitor className="h-3 w-3 text-gray-700" />
                                                                    <span className="font-normal text-[11px]">Show</span>
                                                                </Link>
                                                            </div>
                                                        )}

                                                        {/* Hover still works for desktop */}
                                                        <div className="absolute hidden group-hover:flex flex-col bg-white text-black text-center px-2 py-2 rounded-md text-sm top-full -left-3 transform -translate-x-1/2 mt-0 whitespace-nowrap z-100 shadow-md border border-gray-200 space-y-2 transition-opacity duration-200">
                                                            <Link
                                                                to={`/events/${event.id}`}
                                                                className="flex items-center space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`View details for event ${event.id}`}
                                                            >
                                                                <Monitor className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">Show</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* pagination */}
                                {eventsData.length > itemsPerPage && (
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

                    {/* Filter Panel */}
                    <FilterPanel
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
