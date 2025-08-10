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
import { Ban, Edit } from "lucide-react";
import { cashiersData } from "./Cashierdata"

function getEventData(id) {
    return cashiersData.find((event) => event.id === id);
}
// 
export default function ShopDetail() {
    const { cashierId } = useParams();
    const navigate = useNavigate();
    const event = getEventData(cashierId);

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
                            Cashier
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
                        <Button className="text-blue-600 border h-6 rounded-[3px] text-[11px] border-blue-600 bg-transparent px-6 font-normal  hover:bg-[#e6e7f0]">
                            <Ban className="h-1 w-1 text-[10px]" />
                            <span>
                                Adjust Balance
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#FFFFFF] text-[11px] rounded-[3px] border-none p-6 space-y-3">
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Name</label>
                    <div className="text-[11px] text-gray-900 font-normal">{event.name}</div>
                </div>
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Id</label>
                    <div className="text-[11px] text-gray-900 font-normal">{event.id}</div>
                </div>
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Username</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.username}
                    </div>
                </div>
                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Active</label>
                    <div className="text-[11px] bg-transparent p-2 border w-7 h-5 mt-0.5 flex items-center justify-center rounded-md text-gray-900 font-normal">
                        {event.active}
                    </div>
                </div>
                <div>
                    <label className="text-[10px]  text-gray-500">Is Supervisor</label>
                    <div className="text-[11px] bg-transparent p-2 border w-7 h-5 mt-0.5 flex items-center justify-center rounded-md text-gray-900 font-normal">
                        {event.isSupervisor}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Cash Limit</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.cashLimit}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Cash Today</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.cashToday}
                    </div>
                </div>

                <div>
                    <label className="text-[10px]  text-[#ABABBA]">Created At</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.createdAt}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Is First Login</label>
                    <div className="text-[11px] bg-transparent p-2 border w-7 h-5 mt-0.5 flex items-center justify-center rounded-md text-gray-900 font-normal">
                        {event.isfirstLogin}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Shop</label>
                    <Link to='/shop' className="text-[11px] text-gray-900 font-normal">
                        {event.shop}
                    </Link>
                </div>
            </div>

        </div >
    );
}