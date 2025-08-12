import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { FilterPanel } from "./FilterPanel";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Events() {
    const [eventsData, setEventsData] = useState([]);
    const [initialEventsData, setInitialEventsData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentView, setCurrentView] = useState("list");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        id: "", name: "", eventNo: "", result: "",
        createdFrom: "", createdTo: "", updatedFrom: "", updatedTo: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch events data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/eventData.json");
                if (!response.ok) throw new Error("Failed to fetch events data.");
                const data = await response.json();
                setEventsData(data);
                setInitialEventsData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Select all checkbox
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(eventsData.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    // Select single checkbox
    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, id]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item !== id));
        }
    };

    // Apply filters
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        let filtered = [...initialEventsData];

        if (newFilters.id) {
            filtered = filtered.filter((e) => e.id.includes(newFilters.id));
        }
        if (newFilters.name) {
            filtered = filtered.filter((e) =>
                e.name.toLowerCase().includes(newFilters.name.toLowerCase())
            );
        }
        if (newFilters.eventNo) {
            filtered = filtered.filter((e) =>
                e.eventNo.includes(newFilters.eventNo)
            );
        }
        if (newFilters.result) {
            filtered = filtered.filter((e) =>
                e.result.toLowerCase().includes(newFilters.result.toLowerCase())
            );
        }
        if (newFilters.createdFrom) {
            filtered = filtered.filter((e) => e.createdAt >= newFilters.createdFrom);
        }
        if (newFilters.createdTo) {
            filtered = filtered.filter((e) => e.createdAt <= newFilters.createdTo);
        }

        setEventsData(filtered);
    };

    // Reset filters
    const handleResetFilters = () => {
        setFilters({
            id: "", name: "", eventNo: "", result: "",
            createdFrom: "", createdTo: "", updatedFrom: "", updatedTo: ""
        });
        setEventsData(initialEventsData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-6 py-2">
                    {/* Breadcrumb */}
                    <div className="mb-2">
                        <nav className="text-[11px]">
                            <span className="text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-2 text-gray-400 text-[9px]">/</span>
                            <span className="text-gray-900 text-[10px]">Events</span>
                        </nav>
                    </div>

                    {/* Page Header */}
                    {currentView === "list" && (
                        <>
                            <div className="flex justify-between items-center mb-6">
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
                                {loading ? (
                                    <div className="flex items-center justify-center h-50" aria-live="polite">
                                        <ScaleLoader color="#3040D6" height={50} width={5} radius={2} />
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full border">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="w-12 px-4 py-3 text-left">
                                                        <Checkbox
                                                            checked={selectedItems.length === eventsData.length && eventsData.length > 0}
                                                            onCheckedChange={handleSelectAll}
                                                        />
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-[9px] font-[500] tracking-wider">
                                                        <div className="flex items-center space-x-2">
                                                            <span>Id</span>
                                                            <ChevronDown className="h-3 w-3 text-gray-400" />
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-[9px] font-[500] tracking-wider">Event No</th>
                                                    <th className="px-6 py-3 text-left text-[9px] font-[500] tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-[9px] font-[500] tracking-wider">Result</th>
                                                    <th className="px-6 py-3 text-left text-[9px] font-[500] tracking-wider">Created At</th>
                                                    <th className="w-12 px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {eventsData.map((event) => (
                                                    <tr key={event.id} className="hover:bg-gray-50">
                                                        <td className="px-4 py-4">
                                                            <Checkbox
                                                                checked={selectedItems.includes(event.id)}
                                                                onCheckedChange={(checked) => handleSelectItem(event.id, checked)}
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 text-[11px] text-gray-900">
                                                            <Link to={`/events/${event.id}`}>{event.id}</Link>
                                                        </td>
                                                        <td className="px-6 py-4 text-[11px] text-gray-900">{event.eventNo}</td>
                                                        <td className="px-6 py-4 text-[11px] text-gray-900">{event.name}</td>
                                                        <td className="px-6 py-4">
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
                                                        <td className="px-6 py-4 text-[11px] text-gray-900">{event.createdAt}</td>
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
                                )}
                            </div>
                        </>
                    )}

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
    );
}
