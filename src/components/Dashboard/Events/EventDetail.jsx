import React, { useEffect, useState } from "react";
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
// import { initialEvents } from "./event";
import axios from "axios";
import { ScaleLoader } from "react-spinners";




export default function EventDetail() {
    const { eventId } = useParams();
    const [detailedEvent, setDetailedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {
        let timer;

        axios
            .get("/eventData.json")
            .then((response) => {
                const eventData = response.data.find(
                    (event) => String(event.id) === String(eventId) // 🔑 ensure type match
                );
                setDetailedEvent(eventData);

                // ⏳ keep loading at least 3s
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching eventDetails data:", error);

                // ⏳ delay error state as well
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });

        // cleanup timer if component unmounts
        return () => clearTimeout(timer);
    }, [eventId]);






    if (!detailedEvent) {
        return (
            <div className="space-y-6 sm:mx-10 pt-6">
                <h1 className="text-2xl font-semibold text-gray-900">Event Not Found</h1>
                <Button onClick={() => navigate("/events")}>Back to Events</Button>
            </div>
        );
    }

    return (
        <>
            {
                loading ? (
                    <div className="flex items-center justify-center h-40 sm:h-50" aria-live="polite">
                        <ScaleLoader color="#3040D6" height={40} sm:height={50} width={4} sm:width={5} radius={2} />
                    </div>
                ) :
                    (
                        <div className="space-y-6 sm:mx-10 pt-6">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/dashboard" className="text-[11px]">
                                            Dashboard
                                        </BreadcrumbLink >
                                    </BreadcrumbItem >
                                    <span className="text-[11px]">/</span>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/events" className="text-[11px]">
                                            Events
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <span className="text-[11px]">/</span>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-[11px]">Show</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList >
                            </Breadcrumb >

                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold text-gray-900">Show</h1>
                            </div>

                            <div className="bg-[#FFFFFF] text-[11px] rounded-[3px] border-none p-6 space-y-4">
                                <div>
                                    <label className="text-[11px]  text-gray-500">Id</label>
                                    <div className="text-[11px] text-gray-900 font-normal">{detailedEvent.id}</div>
                                </div>
                                <div>
                                    <label className="text-[11px]  text-gray-500">Name</label>
                                    <div className="text-[11px] text-gray-900 font-normal">
                                        {detailedEvent.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px]  text-gray-500">Event No</label>
                                    <div className="text-[11px] text-gray-900 font-normal">
                                        {detailedEvent.eventNo}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px]  text-gray-500">Result</label>
                                    <div className="text-[11px] text-gray-900 font-normal">
                                        {detailedEvent.result}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px]  text-gray-500">Created At</label>
                                    <div className="text-[11px] text-gray-900 font-normal">
                                        {detailedEvent.createdAt}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-[Roboto]  text-gray-500">Updated At</label>
                                    <div className="text-[11px] text-gray-900 font-normal">
                                        {detailedEvent.updated}
                                    </div>
                                </div>
                            </div>

                        </div >
                    )
            }

        </>
    );
}