"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

    // Fetch events data
    useEffect(() => {
        let timer;

        axios.get("/eventData.json")
            .then((response) => {
                setEventsData(response.data)
                // setInitialEventsData(response.data)
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching event data:", error);
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
        // Cleanup timer if component unmounts
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
    }



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-4 sm:px-6 py-2 max-w-full">
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
                            <Link to="createShop">
                                <Button
                                    variant="outline"
                                    className="flex font-[Roboto] items-center text-[#3040D6] text-[12px] rounded-[3px] border-[#3040D6]  hover:bg-[#EDEFF7] bg-transparent w-34 h-7.5"
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

                    <div className="bg-white p-3 sm:p-4 border-none rounded-lg shadow-sm border border-gray-200">
                        {loading ? (
                            <div className="flex items-center justify-center h-40 sm:h-50" aria-live="polite">
                                <ScaleLoader color="#3040D6" height={40} sm:height={50} width={4} sm:width={5} radius={2} />
                            </div>
                        ) : (
                            <div className="overflow-x-auto md:overflow-x-hidden">
                                <table className="w-full border mb-26">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            {/* Checkbox column - visible on all screen sizes */}
                                            <th className="w-12 px-4 py-3 text-left">
                                                <Checkbox
                                                    checked={selectedItems.length === eventsData.length && eventsData.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            {/* Id column - visible on all screen sizes */}
                                            <th className="px-6 py-3 text-left text-[9px] font-medium tracking-wider">
                                                <div className="flex items-center space-x-2">
                                                    <span>Id</span>
                                                    <ChevronDown className="h-3 w-3 text-gray-400" />
                                                </div>
                                            </th>
                                            {/* Other columns - hidden on mobile, visible on sm and above */}
                                            <th className="sm:table-cell hidden px-6 py-3 text-left text-[9px] font-medium tracking-wider">Event No</th>
                                            <th className="sm:table-cell hidden px-6 py-3 text-left text-[9px] font-medium tracking-wider">Name</th>
                                            <th className="sm:table-cell hidden px-6 py-3 text-left text-[9px] font-medium tracking-wider">Result</th>
                                            <th className="sm:table-cell hidden px-6 py-3 text-left text-[9px] font-medium tracking-wider">Created At</th>
                                            <th className=" w-12 px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {eventsData.map((event) => (
                                            <tr key={event.id} className="hover:bg-gray-50">
                                                {/* Checkbox column - visible on all screen sizes */}
                                                <td className="px-4 py-4">
                                                    <Checkbox
                                                        checked={selectedItems.includes(event.id)}
                                                        onCheckedChange={(checked) => handleSelectItem(event.id, checked)}
                                                    />
                                                </td>
                                                {/* Id column - visible on all screen sizes */}
                                                <td className="px-6 py-4 text-[11px] text-gray-900">
                                                    <Link to={`/events/${event.id}`}>{event.id}</Link>
                                                </td>
                                                {/* Other columns - hidden on mobile, visible on sm and above */}
                                                <td className="sm:table-cell hidden px-6 py-4 text-[11px] text-gray-900">{event.eventNo}</td>
                                                <td className="sm:table-cell hidden px-6 py-4 text-[11px] text-gray-900">{event.name}</td>
                                                <td className="sm:table-cell hidden px-6 py-4">
                                                    <Badge
                                                        variant="secondary"
                                                        className={
                                                            event.result === "pending"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : event.result === "success"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                        }
                                                    >
                                                        {event.result}
                                                    </Badge>
                                                </td>
                                                <td className="sm:table-cell hidden px-6 py-4 text-[11px] text-gray-900">{event.createdAt}</td>
                                                <td className=" px-6 py-4">
                                                    <div className="relative inline-block group">
                                                        <button
                                                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            aria-label="Show more options"
                                                        >
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </button>
                                                        <div className="absolute cursor-pointer hidden group-hover:block bg-white text-black text-center px-4 py-2 rounded-md text-sm bottom-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap z-10 shadow-md border border-gray-200 flex items-center justify-center space-x-2 transition-opacity duration-200 hover:bg-[#F8F9F9]">
                                                            <Link
                                                                to={`/events/${event.id}`}
                                                                className="flex items-center space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                aria-label={`View details for event ${event.id}`}
                                                            >
                                                                <Monitor className="h-3 w-3 text-gray-700" />
                                                                <span className="font-normal text-[11px]">Show</span>
                                                            </Link>
                                                        </div>
                                                        <span className="absolute hidden group-hover:block w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white bottom-[100%] left-1/2 transform -translate-x-1/2 mt-1 z-10"></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
        </div >
    )
}
