"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Filter, MoreHorizontal, ChevronDown } from 'lucide-react'
import { CreateNewForm } from './CreateNewForm'
import { FilterPanel } from './FilterPanel'
import { initialEvents } from './event' // Import initialEvents from the new JS file

export default function Events() {
    const [allEvents, setAllEvents] = useState(initialEvents)
    const [filteredEvents, setFilteredEvents] = useState(initialEvents)
    const [selectedItems, setSelectedItems] = useState([])
    const [currentView, setCurrentView] = useState('list')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [activeFilters, setActiveFilters] = useState({
        id: "", name: "", eventNo: "", result: "",
        createdFrom: "", createdTo: "", updatedFrom: "", updatedTo: ""
    })

    // Function to apply filters to allEvents and update filteredEvents
    const applyFilters = (filters) => {
        setActiveFilters(filters)
        let tempFilteredEvents = [...allEvents]

        if (filters.id) {
            tempFilteredEvents = tempFilteredEvents.filter(event => event.id.includes(filters.id))
        }
        if (filters.name) {
            tempFilteredEvents = tempFilteredEvents.filter(event => event.name.toLowerCase().includes(filters.name.toLowerCase()))
        }
        if (filters.eventNo) {
            tempFilteredEvents = tempFilteredEvents.filter(event => event.eventNo.includes(filters.eventNo))
        }
        if (filters.result) {
            tempFilteredEvents = tempFilteredEvents.filter(event => event.result.toLowerCase().includes(filters.result.toLowerCase()))
        }

        // Date filtering for 'createdAt'
        if (filters.createdFrom) {
            tempFilteredEvents = tempFilteredEvents.filter(event => event.createdAt >= filters.createdFrom)
        }
        if (filters.createdTo) {
            tempFilteredEvents = tempFilteredEvents.filter(event => event.createdAt <= filters.createdTo)
        }

        setFilteredEvents(tempFilteredEvents)
    }

    // Function to add a new event
    const addEvent = (newEventData) => {
        const newId = (parseInt(allEvents[0]?.id || "100000") + 1).toString()
        const newCreatedAt = new Date().toISOString().slice(0, 16).replace('T', ' ')

        const eventToAdd = {
            id: newId,
            createdAt: newCreatedAt,
            ...newEventData,
        }

        setAllEvents((prevEvents) => {
            const updatedEvents = [eventToAdd, ...prevEvents]
            return updatedEvents
        })
    }

    // Reset filters
    const resetFilters = () => {
        const defaultFilters = {
            id: "", name: "", eventNo: "", result: "",
            createdFrom: "", createdTo: "", updatedFrom: "", updatedTo: ""
        }
        applyFilters(defaultFilters)
    }

    // Re-apply filters whenever allEvents or activeFilters change
    useEffect(() => {
        applyFilters(activeFilters)
    }, [allEvents, activeFilters])

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(filteredEvents.map((item) => item.id))
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

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Page Content */}
                <main className="flex-1 p-6">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="text-sm">
                            <span className="text-[12px]">Dashboard</span>
                            <span className="mx-2 text-gray-400">/</span>
                            <span className="text-gray-900 text-[13px]">Events</span>
                            {currentView === 'create' && (
                                <>
                                    <span className="mx-2 text-gray-400">/</span>
                                    <span className="text-gray-900 text-[13px]">Create new</span>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Conditional Rendering */}
                    {currentView === 'list' && (
                        <EventsListContent
                            eventsData={filteredEvents}
                            selectedItems={selectedItems}
                            handleSelectAll={handleSelectAll}
                            handleSelectItem={handleSelectItem}
                            setCurrentView={setCurrentView}
                            setIsFilterOpen={setIsFilterOpen}
                        />
                    )}
                    {currentView === 'create' && (
                        <CreateNewForm setCurrentView={setCurrentView} onSave={addEvent} />
                    )}

                    {/* Filter Dialog */}
                    <FilterPanel
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        onApplyFilters={applyFilters}
                        onResetFilters={resetFilters}
                        initialFilters={activeFilters}
                    />
                </main>
            </div>
        </div>
    )
}

function EventsListContent({
    eventsData,
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    setCurrentView,
    setIsFilterOpen,
}) {
    return (
        <>
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                    <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">100078</span>
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
            {/* Data Table */}
            <div className="bg-white p-4 border-none rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full border">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="w-12 px-4 py-3 text-left">
                                    <Checkbox
                                        checked={selectedItems.length === eventsData.length && eventsData.length > 0}
                                        onCheckedChange={handleSelectAll}
                                        className={"border"}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-[9px] font-[700] text-gray-500 tracking-wider">
                                    <div className="flex items-center space-x-2">
                                        <span>Id</span>
                                        <ChevronDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-[10px] font-[700] tracking-wider">
                                    Event No
                                </th>
                                <th className="px-6 py-3 text-left text-[9px] font-[700] tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-[9px] font-[700] tracking-wider">
                                    Result
                                </th>
                                <th className="px-6 py-3 text-left text-[9px] font-[700] tracking-wider">
                                    Created At
                                </th>
                                <th className="w-12 px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 font-[normal]">
                            {eventsData.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <Checkbox
                                            checked={selectedItems.includes(event.id)}
                                            onCheckedChange={(checked) => handleSelectItem(event.id, checked)}
                                            className={"border"}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-[12px] text-gray-900">{event.id}</td>
                                    <td className="px-6 py-4 text-[12px] text-gray-900">{event.eventNo}</td>
                                    <td className="px-6 py-4 text-[12px] text-gray-900">{event.name}</td>
                                    <td className="px-6 py-4 text-[12px] text-gray-900 max-w-md">
                                        {event.result === "pending" ? (
                                            <span className="text-blue-600">pending</span>
                                        ) : (
                                            <span className="truncate block">{event.result}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-[12px] text-gray-900">{event.createdAt}</td>
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
        </>
    )
}
