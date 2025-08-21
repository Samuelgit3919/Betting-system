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
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit } from "lucide-react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";



export default function ShopDetail({ setCurrentView }) {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [detailedShop, setDetailedShop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer;

        axios.get('/shopData.json')
            .then(response => {
                const shopData = response.data.find(
                    (shop) => String(shop.id) === String(shopId) // 🔑 ensure type match
                );
                setDetailedShop(shopData);

                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(error => {
                console.error("Error fetching shopDetails data:", error);
                timer = setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });

        // cleanup timer if component unmounts
        return () => clearTimeout(timer);
    }, [shopId])


    if (!detailedShop) {
        return (
            <div className="space-y-6 sm:mx-10 pt-6">
                <h1 className="text-2xl font-semibold text-gray-900">Event Not Found</h1>
                <Button onClick={() => navigate("/Shops")}>Back to Shops</Button>
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
                ) : (
                    <div className="space-y-3 sm:mx-10 pt-6 mb-6">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard" className="text-[11px]">
                                        Dashboard
                                    </BreadcrumbLink >
                                </BreadcrumbItem >
                                <span className="text-[11px]">/</span>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/shops" className="text-[11px]">
                                        Shops
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <span className="text-[11px]">/</span>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-[11px]">Show</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList >
                        </Breadcrumb >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold text-gray-900">Show</h1>
                            </div>
                            <Link to={`/shops/edit/${detailedShop.id}`} className="flex items-center">
                                <Button className="text-blue-600 border h-7 rounded-[3px] text-[11px] border-blue-600 font-normal bg-transparent px-6  hover:bg-[#D5D9F3]"
                                    onClick={() => setCurrentView("create")}
                                >
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
                                <div className="text-[11px] text-gray-900 font-normal">{detailedShop.name}</div>
                            </div>
                            <div>
                                <label className="text-[10px]  text-[#ABABBA]">Id</label>
                                <div className="text-[11px] text-gray-900 font-normal">{detailedShop.id}</div>
                            </div>
                            <div>
                                <label className="text-[10px]  text-[#ABABBA]">Username</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.username}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px]  text-[#ABABBA]">Active</label>
                                <div className="text-[11px] bg-transparent p-2 border w-7 h-5 mt-0.5 flex items-center justify-center rounded-md text-gray-900 font-normal">
                                    {detailedShop.active}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px]  text-gray-500">Profit Share</label>
                                <div className="text-[9px] bg-[#BBC3CB] border w-5 text-white h-5 mt-0.5 flex items-center justify-center rounded-full font-normal">
                                    {detailedShop.profitShare}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px]  text-[#ABABBA]">Created At</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.createdAt}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Updated At</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.updated}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Min Stake</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.minStake}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Max Stake</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.MaxStake}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">Feed Source</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.FeedSource}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-[Roboto]  text-[#ABABBA]">logo</label>
                                <div className="text-[11px] text-gray-900 font-normal">
                                    {detailedShop.logo}
                                </div>
                            </div>
                        </div>

                    </div >
                )
            }
        </>

    );
}