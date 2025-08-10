// src/pages/CreateNewShopForm.jsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload } from "lucide-react";

export function CreateNewShop({ setCurrentView, onSave }) {
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
        <div>
            <h1 className="text-2xl font-semibold mb-6">Create new</h1>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded shadow-sm">
                <div>
                    <Label>Username</Label>
                    <Input name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <Label>Name</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                    <Label>Password</Label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div>
                    <Label>Profit Share</Label>
                    <Select value={formData.profitShare} onValueChange={(value) => setFormData((prev) => ({ ...prev, profitShare: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0%">0%</SelectItem>
                            <SelectItem value="10%">10%</SelectItem>
                            <SelectItem value="20%">20%</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Feed Source</Label>
                    <Select value={formData.feedSource} onValueChange={(value) => setFormData((prev) => ({ ...prev, feedSource: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Logo</Label>
                    <div className="border-dashed border-2 border-gray-300 p-4 rounded flex items-center justify-center text-gray-500">
                        <label className="cursor-pointer flex flex-col items-center">
                            <Upload className="mb-2" />
                            <span>Drop your file here, or click to browse</span>
                            <input type="file" name="logo" onChange={handleFileChange} className="hidden" />
                        </label>
                    </div>
                </div>

                <div>
                    <Label>Agent</Label>
                    <Input name="agent" value={formData.agent} onChange={handleChange} />
                </div>

                <div>
                    <Label>Operator</Label>
                    <Input name="operator" value={formData.operator} onChange={handleChange} required />
                </div>

                <Button type="submit">Save</Button>
            </form>
        </div>
    );
}
