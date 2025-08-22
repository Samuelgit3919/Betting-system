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


export default function EditCashierForm() {
    const { id } = useParams(); // 🔑 get shop id from URL
    const navigate = useNavigate();
    // const [cashierData, setCashierData] = useState(null)
    // console.log(cashierData)

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        miniStack: "",
        isSupervisor: false,
        cashLimit: "",
        shop: "",
        status: "active",
    });

    // 🔥 Fetch shop data from public JSON and set as default
    useEffect(() => {
        axios.get("/cashierData.json")
            .then((response) => {
                const cashiers = response.data;
                console.log(cashiers)
                const cashier = cashiers.find((s) => String(s, id) === String(id));

                if (cashier) {
                    setFormData({
                        username: cashier.username || "",
                        name: cashier.name || "",
                        password: cashier.password || "",
                        isSupervisor: cashier.profitShare || false,
                        cashLimit: cashier.cashLimit || "",
                        shop: cashier.shop || "",
                        status: cashier.status || "active",
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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated shop data:", formData);
        navigate("/cashier");
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
                        Cashiers
                    </BreadcrumbItem>
                    <span className="text-[10px]">/</span>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-[10px]">Edit Cashier</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-6 px-4 flex justify-between items-center">
                <h1 className="text-2xl font-normal text-gray-900">Edit Cashier</h1>
                <Link to={`/cashier/${id}`}>
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


                {/* status isSuperviced */}
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
                <div className="grid gap-2">
                    <div className="flex gap-4 text-[11px]">
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="isSupervisor"
                                checked={formData.isSupervisor}
                                onChange={handleChange}
                            />
                            * is Supervisor
                        </label>
                    </div>
                </div>

                {/* mini stack */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Cash Limit</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        name="cashLimit"
                        value={formData.miniStack}
                        onChange={handleChange}
                    />
                </div>

                {/* max stack */}
                <div className="grid gap-2">
                    <Label className="text-[9px]">* Shop</Label>
                    <input
                        className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]"
                        name="shop"
                        value={formData.shop}
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
