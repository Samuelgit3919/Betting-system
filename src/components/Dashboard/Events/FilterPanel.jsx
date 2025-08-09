
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Calendar, X } from 'lucide-react'

export function FilterPanel({ isOpen, onClose, onApplyFilters, onResetFilters, initialFilters }) {
    const [filterId, setFilterId] = useState(initialFilters.id)
    const [filterName, setFilterName] = useState(initialFilters.name)
    const [filterEventNo, setFilterEventNo] = useState(initialFilters.eventNo)
    const [filterResult, setFilterResult] = useState(initialFilters.result)
    const [createdFrom, setCreatedFrom] = useState(initialFilters.createdFrom)
    const [createdTo, setCreatedTo] = useState(initialFilters.createdTo)
    const [updatedFrom, setUpdatedFrom] = useState(initialFilters.updatedFrom)
    const [updatedTo, setUpdatedTo] = useState(initialFilters.updatedTo)

    // Sync internal state with initialFilters when sheet opens or initialFilters change
    useState(() => {
        setFilterId(initialFilters.id)
        setFilterName(initialFilters.name)
        setFilterEventNo(initialFilters.eventNo)
        setFilterResult(initialFilters.result)
        setCreatedFrom(initialFilters.createdFrom)
        setCreatedTo(initialFilters.createdTo)
        setUpdatedFrom(initialFilters.updatedFrom)
        setUpdatedTo(initialFilters.updatedTo)
    }, [initialFilters])


    const handleApplyChanges = () => {
        const filters = {
            id: filterId,
            name: filterName,
            eventNo: filterEventNo,
            result: filterResult,
            createdFrom: createdFrom,
            createdTo: createdTo,
            updatedFrom: updatedFrom,
            updatedTo: updatedTo,
        }
        onApplyFilters(filters)
        onClose()
    }

    const handleReset = () => {
        setFilterId("")
        setFilterName("")
        setFilterEventNo("")
        setFilterResult("")
        setCreatedFrom("")
        setCreatedTo("")
        setUpdatedFrom("")
        setUpdatedTo("")
        onResetFilters()
        onClose()
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="w-full sm:max-w-[330px] p-0 flex flex-col">
                <div className="flex justify-between items-center p-6">
                    <SheetTitle className="text-2xl font-normal">Filters</SheetTitle>
                </div>
                <div className="p-6 grid gap-1 flex-1 overflow-y-hidden">
                    <div className="grid gap-2 text-[10px]">
                        <Label className="text-[10px] font-normal" htmlFor="filter-id">Id</Label>
                        <input className="border border-[#9EAAB5] focus:outline-nones:outline-1  px-2 py-1 text-[10px]" id="filter-id" value={filterId} onChange={(e) => setFilterId(e.target.value)} />
                    </div>
                    <div className="grid gap-2 text-[11px]">
                        <Label className="text-[10px] font-normal" htmlFor="filter-name">Name</Label>
                        <input id="filter-name" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 py-1 text-[10px]" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                    </div>
                    <div className="grid gap-2 text-[10px]">
                        <Label className="text-[10px] font-normal" htmlFor="filter-event-no">Event No</Label>
                        <input id="filter-event-no" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 py-1 text-[11px]" value={filterEventNo} onChange={(e) => setFilterEventNo(e.target.value)} />
                    </div>
                    <div className="grid gap-2 text-[11px]">
                        <Label className="text-[10px] font-normal" htmlFor="filter-result">Result</Label>
                        <input id="filter-result" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 py-1 text-[10px]" value={filterResult} onChange={(e) => setFilterResult(e.target.value)} />
                    </div>
                    <div className="grid gap-2 mt-1">
                        <Label className="text-[10px] font-normal">Created At</Label>
                        <div className="grid gap-2 pl-0">
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-normal" htmlFor="created-from">- From:</Label>
                                <div className="relative">
                                    <input id="created-from" type="datetime-local" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 w-full py-1 text-[10px]" value={createdFrom} onChange={(e) => setCreatedFrom(e.target.value)} />
                                    {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-normal" htmlFor="created-to">- To:</Label>
                                <div className="relative">
                                    <input id="created-to" type="datetime-local" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 w-full py-1 text-[10px]" value={createdTo} onChange={(e) => setCreatedTo(e.target.value)} />
                                    {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2 mt-1">
                        <Label className="text-[10px] font-normal">Updated At</Label>
                        <div className="grid gap-2">
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-normal" htmlFor="updated-from">- From:</Label>
                                <div className="relative">
                                    <input id="updated-from" type="datetime-local" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 w-full py-1 text-[10px]" value={updatedFrom} onChange={(e) => setUpdatedFrom(e.target.value)} />
                                    {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-normal" htmlFor="updated-to">- To:</Label>
                                <div className="relative">
                                    <input id="updated-to" type="datetime-local" className="border border-[#9EAAB5] focus:outline-none focus:outline-1  px-2 w-full py-1 text-[10px]" value={updatedTo} onChange={(e) => setUpdatedTo(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-2 p-6 ">
                    <Button variant="outline" className="border-gray-300 cursor-pointer text-[#3242D6] px-7 h-[26px] font-normal rounded-[3px] hover:bg-gray-50 text-[11px]" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button className="bg-[#3040D6] hover:bg-[#2532a8] cursor-pointer px-7 h-[26px] text-white text-[10px] font-normal rounded-[3px]" onClick={handleApplyChanges}>
                        Apply changes
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
