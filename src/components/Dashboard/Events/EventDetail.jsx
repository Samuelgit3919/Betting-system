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
import { useParams, useNavigate } from "react-router-dom";
import { initialEvents } from "./event";

function getEventData(id) {
    return initialEvents.find((event) => event.id === id);
}

export default function EventDetail() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const event = getEventData(eventId);

    if (!event) {
        return (
            <div className="space-y-6 sm:mx-10 pt-6">
                <h1 className="text-2xl font-semibold text-gray-900">Event Not Found</h1>
                <Button onClick={() => navigate("/events")}>Back to Events</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:mx-10 pt-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard" className="text-[11px]">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/events" className="text-[11px]">
                            Events
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-[11px]">{event.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">{event.name}</h1>
            </div>

            <div className="bg-[#FFFFFF] text-[11px] rounded-[3px] border-none p-6 space-y-4">
                <div>
                    <label className="text-[11px]  text-gray-500">Id</label>
                    <div className="text-[11px] text-gray-900 font-normal">{event.id}</div>
                </div>
                <div>
                    <label className="text-[11px]  text-gray-500">Name</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.name}
                    </div>
                </div>
                <div>
                    <label className="text-[11px]  text-gray-500">Event No</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.eventNo}
                    </div>
                </div>
                <div>
                    <label className="text-[11px]  text-gray-500">Result</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.result}
                    </div>
                </div>
                <div>
                    <label className="text-[11px]  text-gray-500">Created At</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.createdAt}
                    </div>
                </div>
                <div>
                    <label className="text-[11px] font-[Roboto]  text-gray-500">Updated At</label>
                    <div className="text-[11px] text-gray-900 font-normal">
                        {event.updated}
                    </div>
                </div>
            </div>

        </div >
    );
}