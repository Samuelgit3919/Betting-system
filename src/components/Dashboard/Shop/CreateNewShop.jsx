// src/pages/CreateNewShopForm.jsx

import { useState } from "react";
import { IoImageSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function CreateNewShop({ setCurrentView, onSave }) {
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
                    <Label className="text-[9px]">* Username</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]" name=" username" value={formData.username} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">* Name</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]" name=" name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">* Password</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]" type=" password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">
                        * Profit Share
                        <span className="inline-flex items-center justify-center w-3 h-3  bg-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="blue"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </span>

                    </Label>
                    <Select value={formData.profitShare} onValueChange={(value) => setFormData((prev) => ({ ...prev, profitShare: value }))}>
                        <SelectTrigger className="w-[100%] max-h-7 text-[10px] border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 rounded-[3px]">
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-[10px]" value="0%">0%</SelectItem>
                            <SelectItem className="text-[10px]" value="10%">10%</SelectItem>
                            <SelectItem className="text-[10px]" value="20%">20%</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">* Feed Source
                        <span className="inline-flex items-center justify-center w-3 h-3  bg-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="blue"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </span>
                    </Label>
                    <Select value={formData.profitShare} onValueChange={(value) => setFormData((prev) => ({ ...prev, profitShare: value }))}>
                        <SelectTrigger className="w-[100%] text-[10px] max-h-7 border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 rounded-[3px]">
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-[10px]" value="0%">0%</SelectItem>
                            <SelectItem className="text-[10px]" value="10%">10%</SelectItem>
                            <SelectItem className="text-[10px]" value="20%">20%</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">Logo</Label>
                    <div className="border-dashed border-2 border-gray-300 p-4 rounded flex items-center justify-center text-gray-500">
                        <label className="cursor-pointer flex flex-col items-center">
                            <IoImageSharp className="mb-2 w-12 h-12" />
                            <span className="text-[9px]">Drop your file here, or click to browse</span>
                            <input type="file" name="logo" onChange={handleFileChange} className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">Agent</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]" name=" agent" value={formData.agent} onChange={handleChange} />
                </div>

                <div className="grid gap-2">
                    <Label className="text-[9px]">* Operator</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]" name=" operator" value={formData.operator} onChange={handleChange} required />
                </div>

                <Button className="bg-[#3040D6] mx-auto h-7 rounded-[3px] flex items-center justify-center w-[70px] text-[11px] hover:bg-[#2532a8] text-white px-7 cursor-pointer" type="submit">Save</Button>
            </form>
        </div>
    );
}
