import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

export function FilterShop({ isOpen, onClose, onApplyFilters, onResetFilters, initialFilters }) {
    const [filterName, setFilterName] = useState("")

    // Sync with initialFilters when opened or changed
    useEffect(() => {
        setFilterName(initialFilters.name || "")
    }, [initialFilters])

    const handleApplyChanges = () => {
        onApplyFilters({ ...initialFilters, name: filterName })
        onClose()
    }

    const handleReset = () => {
        setFilterName("")
        onResetFilters()
        onClose()
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="w-full sm:max-w-[330px] p-0 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6">
                    <SheetTitle className="text-2xl font-normal">Filters</SheetTitle>
                </div>

                {/* Filter Input */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <div className="grid gap-2 text-[10px]">
                        <Label className="text-[10px] font-normal" htmlFor="filter-name">Name</Label>
                        <input
                            id="filter-name"
                            className="border border-[#9EAAB5] focus:outline-none px-2 py-1 text-[10px] rounded-sm"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-2 p-6">
                    <Button
                        variant="outline"
                        className="border-gray-300 text-[#3242D6] px-7 h-[26px] font-normal rounded-[3px] text-[11px]"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        className="bg-[#3040D6] hover:bg-[#2532a8] px-7 h-[26px] text-white text-[10px] font-normal rounded-[3px]"
                        onClick={handleApplyChanges}
                    >
                        Apply changes
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
