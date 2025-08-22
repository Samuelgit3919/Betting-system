// src/pages/EditShopForm.jsx
import { useState, useEffect } from "react";
import { IoImageSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MonitorCheck } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditShopForm() {
    const { id } = useParams(); // 🔑 get shop id from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        profitShare: "0%",
        feedSource: "",
        logo: null,
        miniStack: "",
        maxStack: "",
        status: "active",
    });

    // console.log(formData)

    // 🔥 Fetch shop data from public JSON and set as default
    useEffect(() => {
        axios.get("/shopData.json") // make sure this file exists in public folder
            .then((response) => {
                const shops = response.data;
                const shop = shops.find((s) => String(s.id) === String(id));
                // console.log(shop)
                if (shop) {
                    setFormData({
                        username: shop.username || "",
                        name: shop.name || "",
                        password: shop.password || "",
                        profitShare: shop.profitShare || "0%",
                        feedSource: shop.feedSource || "",
                        logo: shop.logo || null,
                        miniStack: shop.miniStack || "",
                        maxStack: shop.maxStack || "",
                        status: shop.status || "active",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching shop data:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? "active" : "inactive") : value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated shop data:", formData);
        navigate("/shops");
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
                        <BreadcrumbLink href="/shops" className="text-[10px]" />
                        Shops
                    </BreadcrumbItem>
                    <span className="text-[10px]">/</span>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-[10px]">Edit shop</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-6 px-4 flex justify-between items-center">
                <h1 className="text-2xl font-normal text-gray-900">Edit shop</h1>
                <Link to={`/shops/${id}`}>
                    <Button
                        variant="outline"
                        className="flex font-[Roboto] items-center text-[#3040D6] text-[12px] rounded-[3px] border-[#3040D6]  hover:bg-[#EDEFF7]  bg-transparent w-22 h-[25px]"
                    >
                        <MonitorCheck className="h-2 w-2" />
                        <span>show</span>
                    </Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="grid bg-white p-6 gap-6 max-w-7xl mx-auto">
                {/* username */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Username</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* name */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Name</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* password */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Password</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* profit share */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Profit Share</Label>
                    <Select
                        value={formData.profitShare}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, profitShare: value }))}
                    >
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

                {/* feed source */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Feed Source</Label>
                    <Select
                        value={formData.feedSource}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, feedSource: value }))}
                    >
                        <SelectTrigger className="w-[100%] text-[10px] max-h-7 border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 rounded-[3px]">
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-[10px]" value="SourceA">Source A</SelectItem>
                            <SelectItem className="text-[10px]" value="SourceB">Source B</SelectItem>
                            <SelectItem className="text-[10px]" value="SourceC">Source C</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* status checkbox */}
                <div className="grid gap-2">
                    <div className="flex gap-4 text-[11px]">
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status === "active"}
                                onChange={handleChange}
                            />
                            * Active
                        </label>
                    </div>
                </div>

                {/* logo */}
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

                {/* mini stack */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">Mini Stack</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        name="miniStack"
                        value={formData.miniStack}
                        onChange={handleChange}
                    />
                </div>

                {/* max stack */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Max Stack</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        name="maxStack"
                        value={formData.maxStack}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* save button */}
                <Button
                    className="bg-[#3040D6] mx-auto h-7 rounded-[3px] flex items-center justify-center w-[70px] text-[11px] hover:bg-[#2532a8] text-white px-7 cursor-pointer"
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </div>
    );
}
