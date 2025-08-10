import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Calendar, X } from 'lucide-react'

export function BetFilter({ isOpen, onClose, onApplyFilters, onResetFilters, initialFilters }) {
    const [filterId, setFilterId] = useState(initialFilters.betSlipId || "")
    const [status, setStatus] = useState(initialFilters.status || "")
    const [cashier, setCashier] = useState(initialFilters.cashier || "")
    const [createdFrom, setCreatedFrom] = useState(initialFilters.createdFrom || "")
    const [createdTo, setCreatedTo] = useState(initialFilters.createdTo || "")
    const [unclaimed, setUnclaimed] = useState(initialFilters.unclaimed || "")

    // Sync internal state with initialFilters when sheet opens or initialFilters change
    useState(() => {
        setFilterId(initialFilters.betSlipId || "")
        setStatus(initialFilters.status || "")
        setCashier(initialFilters.cashier || "")
        setCreatedFrom(initialFilters.createdFrom || "")
        setCreatedTo(initialFilters.createdTo || "")
    }, [initialFilters])

    const handleApplyChanges = () => {
        const filters = {
            betSlipId: filterId,
            status: status,
            cashier: cashier,
            createdFrom: createdFrom,
            createdTo: createdTo,
            unclaimed: unclaimed,
        }
        onApplyFilters(filters)
        onClose()
    }

    const handleReset = () => {
        setFilterId("")
        setStatus("")
        setCashier("")
        setCreatedFrom("")
        setCreatedTo("")
        onResetFilters()
        onClose()
        setUnclaimed("")
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="w-full sm:max-w-[330px] p-0 flex flex-col">
                <div className="flex justify-between items-center p-6  border-gray-200">
                    <SheetTitle className="text-xl font-normal">Filters</SheetTitle>
                </div>
                <div className="px-6 py-2 flex gap-2 flex-col flex-1 overflow-y-hidden">
                    <div className="flex flex-col gap-1 text-[10px]">
                        <Label className="text-[9px] font-normal" htmlFor="filter-betSlipId">betSlip Id</Label>
                        <input
                            id="filter-betSlipId"
                            value={filterId}
                            onChange={(e) => setFilterId(e.target.value)}
                            className="border border-[#9EAAB5] focus:outline-nones:outline-1  px-2 py-1 h-6 text-[10px]"
                        />
                    </div>
                    <div className="flex flex-col gap-1 text-[10px]">
                        <Label className="text-[9px] font-normal" htmlFor="filter-unclaimed">Unclaimed</Label>
                        <select
                            id="filter-unclaimed"
                            value={unclaimed}
                            onChange={(e) => setUnclaimed(e.target.value)}
                            className="border border-[#9EAAB5] focus:outline-none px-2 py-1 h-6 text-[10px] appearance-none bg-white"
                        >
                            <option value="">Select...</option>
                            <option value="Unclaimed">Yes</option>
                            <option value="Claimed">No</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 text-[10px]">
                        <Label className="text-[9px] font-normal" htmlFor="filter-status">Status</Label>
                        <select
                            id="filter-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-[#9EAAB5] focus:outline-none px-2 py-1 h-6 text-[10px] appearance-none bg-white"
                        >
                            <option value="">Select...</option>
                            <option value="Placed">Placed</option>
                            <option value="Redeemed">Redeemed</option>
                            <option value="Redeemed">Cancelled</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 text-[10px]">
                        <Label className="text-[9px] font-normal" htmlFor="filter-cashier">Cashier</Label>
                        <select
                            id="filter-cashier"
                            value={cashier}
                            onChange={(e) => setCashier(e.target.value)}
                            className="border border-[#9EAAB5] focus:outline-none px-2 py-1 h-6 text-[10px] appearance-none bg-white"
                        >
                            <option value="">Select...</option>
                            <option value="Cashier1">Ban.cashier1</option>
                            <option value="Cashier1">Ban.cashier12</option>
                            <option value="Cashier1">Ban.cashier10</option>
                            <option value="Cashier1">Ban.cashier8</option>
                            <option value="Cashier1">Ban.cashier5</option>
                            <option value="Cashier1">Ban.cashier2</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1  text-[10px]">
                        <Label className="text-[9px] font-normal">Created At</Label>
                        <div className="flex flex-col gap-1 text-[10px]">
                            <div className="grid gap-1">
                                <Label className="text-[9px] font-normal" htmlFor="created-from">- From:</Label>
                                <input
                                    id="created-from"
                                    type="datetime-local"
                                    value={createdFrom}
                                    onChange={(e) => setCreatedFrom(e.target.value)}
                                    className="border border-[#9EAAB5] focus:outline-nones:outline-1  px-2 py-1 text-[10px] h-6"
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-[9px] font-normal" htmlFor="created-to">- To:</Label>
                                <input
                                    id="created-to"
                                    type="datetime-local"
                                    value={createdTo}
                                    onChange={(e) => setCreatedTo(e.target.value)}
                                    className="border border-[#9EAAB5] focus:outline-nones:outline-1  px-2 py-1 text-[10px] h-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-2 p-6 border-gray-200">
                    <Button
                        variant="outline"
                        className="border-gray-300 h-6 text-[11px] text-blue-600 px-4 rounded-[3px] hover:bg-gray-50"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        className="bg-[#1F2B9B] h-6 flex justify-center items-center text-white text-[11px] px-4 rounded-[3px] hover:bg-blue-700"
                        onClick={handleApplyChanges}
                    >
                        Apply changes
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}