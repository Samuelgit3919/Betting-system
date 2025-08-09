import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, useNavigate, Link } from "react-router-dom";
import { shopsData } from "./shopData"
import { Edit } from "lucide-react";


function getEventData(id) {
    return shopsData.find((event) => event.id === id);
}
// 
export default function ShopDetail() {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const event = getEventData(shopId);

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
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shops" className="text-[11px]">
                            Shops
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-[11px]">{event.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Show</h1>
                </div>
                <Link to={`/createShop`}>
                    <Button className="text-blue-600 border h-7 rounded-[3px] text-[11px] border-blue-600 bg-transparent px-6  hover:bg-[#D5D9F3]">
                        <span>
                            <Edit className="h-1 w-1" />
                        </span>
                        <span >
                            Edit
                        </span>
                    </Button>
                </Link>
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
                    <label className="text-[10px]  text-gray-500">Profit Share</label>
                    <div className="text-[9px] bg-[#BBC3CB] border w-5 text-white h-5 mt-0.5 flex items-center justify-center rounded-full font-normal">
                        {event.profitShare}
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
                        {event.updated}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Min Stake</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.minStake}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Max Stake</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.MaxStake}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Feed Source</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.FeedSource}
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">logo</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.logo}
                    </div>
                </div>
            </div>

        </div >
    );
}