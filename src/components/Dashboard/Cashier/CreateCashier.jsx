// src/pages/CreateNewShopForm.jsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"


export default function CreateCashier({ setCurrentView, onSave }) {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        profitShare: "0%",
        feedSource: "",
        logo: null,
        agent: "",
        operator: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setCurrentView('list');
    };

    return (
        <div className="px-3">
            <Breadcrumb className="p-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard" className="text-[11px]">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <span className="text-[10px]">/</span>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/events" className="text-[10px]">
                            Events
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <span className="text-[10px]">/</span>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-[10px]">Create new</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-6 px-4">
                <h1 className="text-2xl font-normal text-gray-900">Create new</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid bg-white p-6 gap-6 max-w-7xl mx-auto">
                <div className="grid gap-2">
                    <Label className="text-[9px]">Shop</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 w-full py-1 text-[11px]" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">Number Of Cashiers</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 w-full py-1 text-[11px]" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">Password</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 w-full py-1 text-[11px]" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="flex justify-center mt-4">
                    <Button type="submit" className="bg-[#3040D6] hover:bg-[#2532a8] text-white px-7 cursor-pointer h-[30px] text-[11px] rounded-[3px]">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
