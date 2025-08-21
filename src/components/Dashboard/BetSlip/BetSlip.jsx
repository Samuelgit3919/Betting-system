import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, MoreHorizontal, ChevronDown, Monitor, Edit, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { BetFilter } from "./BetFilter";
import ScaleLoader from "react-spinners/ScaleLoader";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function BetSlip() {
    const [betSlipData, setBetSlipData] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "" });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);


    // ✅ Fetch from public folder
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/betData.json");
                if (!response.ok) throw new Error("Failed to fetch shops data.");
                const data = await response.json();
                setBetSlipData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        const filteredData = betSlipData.filter((shop) =>
            shop.id.toLowerCase().includes(newFilters.name.toLowerCase())
        );
        setBetSlipData(filteredData);
    };

    const handleResetFilters = () => {
        setFilters({ name: "" });
        // Refetch or reload original data
        fetch("/betData.json")
            .then((res) => res.json())
            .then((data) => setBetSlipData(data));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-6 py-2">
                    {/* Breadcrumb */}
                    <div className="mb-2 flex justify-between items-center">
                        <nav className="text-sm text-gray-500">
                            <span className="text-[10px] text-[#898A9A]">Dashboard</span>
                            <span className="mx-2 text-gray-400 text-[9px]">/</span>
                            <span className="text-gray-900 text-[10px]">Bet Slip</span>
                        </nav>
                        <Button className="bg-[] cursor-pointer border border-[#3040D6]  rounded-[8px] h-5 hover:bg-[#EDEFF7]">
                            <span className="text-[9px] text-[#3040D6]">
                                Export
                            </span>
                        </Button>
                    </div>

                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-[Sans-serif] text-gray-900">List</h1>
                            <span className="border-2 border-gray-200 rounded-full px-2 text-gray-600 py-0.5 text-[11px]">
                                {betSlipData.length}
                            </span>
                        </div>
                        <div className="flex items-center justify-center space-x-5">
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
                        {
                            loading ? (
                                <div className="flex items-center justify-center h-50" aria-live="polite">
                                    <ScaleLoader color="#3040D6" height={50} width={5} radius={2} />
                                </div>
                            ) :
                                (
                                    <div className="overflow-x-auto">
                                        <table className="w-full border mb-26">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-[9px] font-[700] tracking-wider">
                                                        <div className="flex items-center space-x-2">
                                                            <span>betSlip Id</span>
                                                            <ChevronDown className="h-3 w-3" />
                                                        </div>
                                                    </th>
                                                    <th className="py-3 text-left text-[9px] font-[700] tracking-wider">
                                                        Total Stake
                                                    </th>
                                                    <th className="py-3 text-left text-[9px] font-[700] tracking-wider">
                                                        Win Amount
                                                    </th>
                                                    <th className="py-3 text-left text-[9px] font-[700] tracking-wider">
                                                        Win Checked
                                                    </th>
                                                    <th className="py-3 text-left text-[9px] font-[700] tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="py-3 text-left text-[9px] font-[700] tracking-wider">
                                                        Created At
                                                    </th>
                                                    <th className="w-12 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {betSlipData.map((betSlip) => (

                                                    <tr key={betSlip.id} className="hover:bg-gray-50">

                                                        <td className="pl-6 py-2.5 text-[12px] text-gray-900">
                                                            <Link to={`/betSlip/${betSlip.id}`}>{betSlip.id}</Link>
                                                        </td>
                                                        <td className=" py-2.5 text-[12px] text-gray-900">
                                                            <Link to={`/betSlip/${betSlip.id}`}>{betSlip.totalStake}</Link>
                                                        </td>
                                                        <td className=" py-2.5 text-[12px] text-gray-900">
                                                            <Link to={`/betSlip/${betSlip.id}`}>{betSlip.winAmount}</Link>
                                                        </td>
                                                        <td className=" py-2.5">
                                                            <Link to={`/betSlip/${betSlip.id}`}>
                                                                <Badge className="text-gray-700 bg-transparent border border-gray-200 rounded-full text-[10px] flex items-center justify-center">
                                                                    {betSlip.winChecked}
                                                                </Badge>
                                                            </Link>
                                                        </td>
                                                        <td className=" py-2.5">
                                                            <Link to={`/betSlip/${betSlip.id}`}>
                                                                <Badge
                                                                    variant={
                                                                        betSlip.status === "Redeemed"
                                                                            ? "default"
                                                                            : "secondary"
                                                                    }
                                                                    className="bg-[#BBC3CB] text-white text-[10px] rounded-md flex items-center justify-center"
                                                                >
                                                                    {betSlip.status}
                                                                </Badge>
                                                            </Link>
                                                        </td>
                                                        <td className=" py-2.5 text-[12px] text-gray-900">
                                                            <Link to={`/betSlip/${betSlip.id}`}>
                                                                <Badge className="text-gray-700 bg-transparent">
                                                                    {betSlip.createdAt}
                                                                </Badge>
                                                            </Link>
                                                        </td>
                                                        <td className=" py-2.5">
                                                            <div className="relative inline-block group">
                                                                <button
                                                                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    aria-label="Show more options"
                                                                >
                                                                    <MoreHorizontal className="h-5 w-5" />
                                                                </button>

                                                                {/* Dropdown */}
                                                                <div
                                                                    className="absolute hidden group-hover:flex flex-col bg-white text-black text-center px-2 py-2 rounded-md text-sm top-full -left-3 transform -translate-x-1/2 mt-0.5 whitespace-nowrap z-10 shadow-md border border-gray-200 space-y-2 transition-opacity duration-200"
                                                                >
                                                                    <Link
                                                                        to={`/betSlip/${betSlip.id}`}
                                                                        className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        aria-label={`View details for betSlip ${betSlip.id}`}
                                                                    >
                                                                        <Monitor className="h-3 w-3 text-gray-700" />
                                                                        <span className="font-normal text-[11px]">Show</span>
                                                                    </Link>

                                                                    <span
                                                                        state={{ betSlip: betSlip }}
                                                                        className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        aria-label={`Edit details for betSlip ${betSlip.id}`}
                                                                    >
                                                                        <Edit className="h-3 w-3 text-gray-700" />
                                                                        <span className="font-normal text-[11px]">Edit</span>
                                                                    </span>

                                                                    <span
                                                                        state={{ shop: betSlip }}
                                                                        className="flex items-center py-1 px-2 hover:bg-[#F8F9F9] space-x-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        aria-label={`Adjust balance for shop ${betSlip.id}`}
                                                                    >
                                                                        <RiDeleteBin6Line className="h-3 w-3 text-red-700" />
                                                                        <span className="font-normal text-red-700 text-[11px]">Delete</span>
                                                                    </span>
                                                                </div>

                                                                {/* Arrow pointing up */}
                                                                <span
                                                                    className="absolute hidden group-hover:block w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white top-full left-1/2 transform -translate-x-1/2 -mt-1 z-10"
                                                                ></span>
                                                            </div>
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
                    <BetFilter
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
