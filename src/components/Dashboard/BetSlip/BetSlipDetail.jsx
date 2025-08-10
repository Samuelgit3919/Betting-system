import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Ban, Delete, Edit, Trash2, Trash2Icon } from "lucide-react";
import { betSlipData } from "./Bet"

function getEventData(id) {
    return betSlipData.find((event) => event.id === id);
}

console.log(betSlipData)
// 
export default function ShopDetail() {
    const { betSlipId } = useParams();
    const navigate = useNavigate();
    const event = getEventData(betSlipId);

    if (!event) {
        return (
            <div className="space-y-6 sm:mx-10 pt-6">
                <h1 className="text-2xl font-semibold text-gray-900">Event Not Found</h1>
                <Button onClick={() => navigate("/Shops")}>Back to Shops</Button>
            </div>
        );
    }

    return (
        <div className="space-y-3 sm:mx-10 pt-6 mb-6">
            <div className="flex justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard" className="text-[11px]">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* <BreadcrumbSeparator /> */}
                        <span className="text-[11px]">/</span>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/shops" className="text-[11px]">
                                BetSlip
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* <BreadcrumbSeparator /> */}
                        <span className="text-[11px]">/</span>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-[11px]">
                                show
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Button className="bg-[] cursor-pointer border border-[#3040D6]  rounded-[8px] h-5 hover:bg-[#EDEFF7]">
                    <span className="text-[9px] text-[#3040D6]">
                        Export
                    </span>
                </Button>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Show</h1>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <Link to={`/createShop`}>
                        <Button className="text-blue-600 border h-6 rounded-[3px] text-[11px] border-blue-600 bg-transparent px-6 font-normal  hover:bg-[#e6e7f0]">
                            <span>
                                <Edit className="h-1 w-1" />
                            </span>
                            <span className="text-[#307DE4]" >
                                Edit
                            </span>
                        </Button>
                    </Link>
                    <Link>
                        <Button className="text-[#C70735] border h-6 rounded-[3px] text-[11px] border-[#C70735] bg-transparent px-6 font-normal  hover:bg-[#F5ECED]">
                            <Trash2 className="h-1 w-1 text-[10px]" />
                            <span>
                                Delete
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#FFFFFF] text-[11px] rounded-[3px] border-none p-6 pb-10 space-y-2">
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">betSlip id</label>
                    <div className="text-[11px] text-gray-900 font-normal">{event.id}</div>
                </div>
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Total Stake</label>
                    <div className="text-[11px] text-gray-900 font-normal">{event.totalStake}</div>
                </div>
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Win Amount</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.winAmount}
                    </div>
                </div>
                <div>
                    <label className="text-[9px]  text-[#ABABBA]">Win Checked</label>
                    <div className="text-[11px] text-gray-500 p-2 border w-8 h-4 flex items-center justify-center rounded-md font-normal">
                        {event.winChecked}
                    </div>
                </div>
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Status</label>
                    <div className="text-[11px] bg-[#BBC3CB] text-white p-2 border w-14 h-5 flex items-center justify-center rounded-md font-normal">
                        {event.status}
                    </div>
                </div>
                <div>
                    <label className="text-[10px]  text-gray-500">Cashier Redeemed By</label>
                    <div className="text-[11px] text-blue-600 hover:bg-[#F4F5FD] cursor-pointer font-normal">
                        {event.cashier}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Cashier</label>
                    <div className="text-[11px] text-blue-600 hover:bg-[#F4F5FD] cursor-pointer font-normal">
                        {event.cashier}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Shop</label>
                    <div className="text-[11px] text-blue-600 hover:bg-[#F4F5FD] cursor-pointer font-normal">
                        {event.shop}
                    </div>
                </div>

                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Created At</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.createdAt}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Updated At</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.updatedAt}
                    </div>
                </div>
                <div className="border-b pt-4">
                    <div className="text-blue-600 font-normal border-b-1 border-blue-600 inline-block pb-1 px-4">
                        <span className="">
                            BetSlip Tickets
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-[3px] border">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-[11px]  bg-gray-50 border-b">
                            <tr>
                                {["Id", "Event Name", "Event No", "Shop", "Cashier", "Stake", "Bet Type"].map(
                                    (heading) => (
                                        <th key={heading} className="px-6 py-2 font-medium text-gray-500">
                                            {heading}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {event.tickets.map((ticket, index) => (
                                <tr
                                    key={ticket.id}
                                    className={`border-b last:border-b-0 hover:bg-gray-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    <td className="px-6 py-3 text-[10px]">{ticket.id}</td>
                                    <td className="px-6 py-3 text-[10px]">{ticket.eventName}</td>
                                    <td className="px-6 py-3 text-[10px]">{ticket.eventNo}</td>
                                    <td className="px-6 py-3 text-[10px] text-blue-600 hover:underline cursor-pointer">
                                        {ticket.shop}
                                    </td>
                                    <td className="px-6 py-3 text-[10px] text-blue-600 hover:underline cursor-pointer">
                                        {ticket.cashier}
                                    </td>
                                    <td className="px-6 py-3 text-[10px]">{ticket.stake}</td>
                                    <td className="px-6 py-3 text-[10px]">
                                        <span className="px-3 py-1 text-[10px] font-medium text-gray-700 bg-gray-100 rounded-full">
                                            {ticket.betType}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}