"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from 'lucide-react'

export function CreateNewForm({ setCurrentView, onSave }) {
    const [name, setName] = useState("")
    const [kenoId, setKenoId] = useState("")
    const [result, setResult] = useState("")
    const [eventId, setEventId] = useState("")
    const [eventNo, setEventNo] = useState("")
    const [startTime, setStartTime] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newEvent = {
            name,
            kenoId,
            result,
            eventId,
            eventNo,
            startTime,
        }
        onSave(newEvent)
        setCurrentView('list')
    }

    return (
        <div className="px-3">
            <div className="mb-6">
                <h1 className="text-2xl font-[Sans-serif] text-gray-900">Create new</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid bg-white p-6 gap-6 max-w-7xl mx-auto">
                <div className="grid gap-2">
                    <Label className="text-[9px]" htmlFor="name">Name</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1 px-2 py-1 text-[11px]" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label className="text-[9px]" htmlFor="keno-id">* Kiron Id</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 py-1 text-[11px]" id="keno-id" value={kenoId} onChange={(e) => setKenoId(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label className="text-[9px]" htmlFor="result">* Result</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 py-1 text-[11px]" id="result" value={result} onChange={(e) => setResult(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label className="text-[9px]" htmlFor="event-id">* Event Id</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 py-1 text-[11px]" id="event-id" value={eventId} onChange={(e) => setEventId(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label className="text-[9px]" htmlFor="event-no">* Event No</Label>
                    <input className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 py-1 text-[11px]" id="event-no" value={eventNo} onChange={(e) => setEventNo(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label className="text-[9px]" htmlFor="start-time">* Start Time </Label>
                    <div className="relative">
                        <input id="start-time" type="date" className="border border-[#9EAAB5] focus:outline-[#3040D6] focus:outline-1  px-2 w-full py-1 text-[11px]" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                        {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" className="bg-[#3040D6] hover:bg-[#2532a8] text-white px-7 cursor-pointer h-[30px] text-[11px] rounded-[3px]">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
