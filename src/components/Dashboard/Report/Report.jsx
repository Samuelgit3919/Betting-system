import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Report() {
    const [span, setSpan] = useState("Today");
    const [fromDate, setFromDate] = useState("08/07/2025 12:00 AM");
    const [toDate, setToDate] = useState("08/07/2025 11:59 PM");
    const [selectedShops, setSelectedShops] = useState("");
    const [selectedCashiers, setSelectedCashiers] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ span, fromDate, toDate, selectedShops, selectedCashiers });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <Card className="w-full max-w-5xl mx-auto border-none bg-[#FFFFFF]  rounded-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-[Sans-serif] font-[400]">Reports</CardTitle>
                </CardHeader>
                <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-4 p-3 bg-[#F8F9FA]">
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-[12px] font-[600] font-[Sans-serif] text-gray-700">Select span:</label>
                                <Select value={span} onValueChange={setSpan}>
                                    <SelectTrigger className="w-full mt-1 pl-3 pr-3 rounded-[3px] text-[12px] font-[400] border border-gray-300 bg-white flex items-center max-h-[30px]">
                                        <SelectValue placeholder="Select span" />
                                    </SelectTrigger>
                                    <SelectContent className={'border text-[12px] font-[400] font-sans border-gray-400 rounded-none'}>
                                        <SelectItem value="Today" className="text-[12px] font-[400] py-1  hover:bg-[#0056B3] focus:bg-[#0056B3] focus:text-white">Today</SelectItem>
                                        <SelectItem value="Yesterday" className="text-[12px] font-[400] py-1  hover:bg-[#0056B3] focus:bg-[#0056B3] focus:text-white">Yesterday</SelectItem>
                                        <SelectItem value="This Week" className="text-[12px] font-[400] py-1  hover:bg-[#0056B3] focus:bg-[#0056B3] focus:text-white">This Week</SelectItem>
                                        <SelectItem value="This Week" className="text-[12px] font-[400] py-1  hover:bg-[#0056B3] focus:bg-[#0056B3] focus:text-white">This Month</SelectItem>
                                        <SelectItem value="Custom" className="text-[12px] font-[400] py-1  hover:bg-[#0056B3] focus:bg-[#0056B3] focus:text-white">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-[12px] font-[600] font-sans text-gray-700">From:</label>
                                <div className="w-full mt-1 flex items-center border border-gray-300 rounded-[3px] bg-white">
                                    <input
                                        type="datetime-local"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="w-full pl-2 pr-2 text-[12px] font-[400] bg-transparent border-none focus:outline-none h-[28px]"
                                        step="60" // Step of 60 seconds (1 minute) to exclude seconds
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[12px] font-[600] font-[Sans-serif] text-gray-700">To:</label>
                                <div className="w-full mt-1 flex items-center border border-gray-300 rounded-[3px] bg-white">
                                    <input
                                        type="datetime-local"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="w-full pl-2 pr-2 text-[12px] font-[400] bg-transparent border-none focus:outline-none h-[28px]"
                                        step="60" // Step of 60 seconds (1 minute) to exclude seconds
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[12px] font-[600] font-sans text-gray-700">Select Shops:</label>
                                <Select value={selectedShops} onValueChange={setSelectedShops}>
                                    <SelectTrigger className="w-full mt-1 pl-3 pr-3 rounded-[3px] text-[12px] font-[400] border border-gray-300 bg-white flex items-center max-h-[30px]">
                                        <SelectValue placeholder="Select..." className="text-gray-500" />
                                        <span className="ml-auto text-gray-400">|</span> {/* Changed | to ▼ to match the dropdown arrow */}
                                    </SelectTrigger>
                                    <SelectContent className="border border-gray-300 bg-white rounded-[3px]  max-h-[200px] overflow-auto">
                                        <SelectItem value="all" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            All
                                        </SelectItem>
                                        <SelectItem value="volt1" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Volt1 (Pa)
                                        </SelectItem>
                                        <SelectItem value="volt2" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Volt2 (Pa)
                                        </SelectItem>
                                        <SelectItem value="volt3" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Volt3 (Pa)
                                        </SelectItem>
                                        <SelectItem value="volt4" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Volt4 (Pa)
                                        </SelectItem>
                                        <SelectItem value="volt5" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Volt5 (Pa)
                                        </SelectItem>
                                        <SelectItem value="volt6" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Volt6 (Pa)
                                        </SelectItem>
                                        <SelectItem value="ban" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">
                                            Ban (Pa)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-[12px] font-[600] font-sans text-gray-700">Select Cashiers:</label>
                                <Select value={selectedShops} onValueChange={setSelectedShops}>
                                    <SelectTrigger className="w-full mt-1 pl-3 pr-3 rounded-[3px] text-[12px] font-[400] border border-gray-300 bg-white flex items-center max-h-[30px]">
                                        <SelectValue placeholder="Select..." className="text-gray-500" />
                                        <span className="ml-auto text-gray-400">|</span>
                                    </SelectTrigger>
                                    <SelectContent className="border border-gray-300 bg-white rounded-[3px] shadow-sm">
                                        <SelectItem value="Shop1" className="text-[12px] font-[400] py-1  hover:bg-[blue-100] focus:bg-blue-100">All</SelectItem>
                                        <SelectItem value="Shop2" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">Volt1.cahier1 (Volt1)</SelectItem>
                                        <SelectItem value="Shop3" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">Volt1.cahier2 (Volt1)</SelectItem>
                                        <SelectItem value="Shop3" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">Volt1.cahier3 (Volt1)</SelectItem>
                                        <SelectItem value="Shop3" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">Volt2.cahier1 (Volt2)</SelectItem>
                                        <SelectItem value="Shop3" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">Volt2.cahier2 (Volt2)</SelectItem>
                                        <SelectItem value="Shop3" className="text-[12px] font-[400] py-1  hover:bg-blue-100 focus:bg-blue-100">Volt2.cahier3 (Volt2)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" className="bg-green-600 text-[12px] font-[500] px-10 rounded-[3px] max-h-[30px] text-white hover:bg-green-700 hover:text-white">
                                Export
                            </Button>
                            <Button type="submit" className="bg-blue-600 px-6 text-[12px] rounded-[3px] font-[500] max-h-[30px] text-white hover:bg-blue-700">
                                Submit
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6 shadow-md border border-gray-100 p-2 bg-white rounded-lg">
                        <table className="w-full text-sm text-gray-500 border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700  bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">#</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">Agent/Shop</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">Bets</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">Slip Count</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">Payout</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">Cancelled</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">Unclaimed</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">GGR</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">RTP</th>
                                    <th className="px-4 py-2 text-center border-b font-[600] text-[12px] border-r border-gray-200">NET/NGR</th>
                                    <th className="px-4 py-2 text-center border-b border-gray-200">Share</th> {/* No right border on the last column */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white">
                                    <td colSpan="11" className="text-center py-6 text-gray-500 text-[12px] font-[400]">
                                        No data available in table
                                    </td>
                                </tr>
                                <tr className="bg-white border-t border-gray-200 font-semibold">
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]"></td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px] font-[700]">Total</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                    <td className="px-4 py-2 text-center border-r border-gray-200 text-[12px]">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}