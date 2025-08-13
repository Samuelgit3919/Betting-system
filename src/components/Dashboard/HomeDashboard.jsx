import { Link } from "react-router-dom";
import { Button } from "../ui/button";




export default function HomeDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Sidebar */}


            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}


                {/* Dashboard Content */}
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center max-w-md flex flex-col items-center justify-center">
                        <h1 className="text-[14px] font-bold text-gray-900 mb-2">Welcome to the Dashboard</h1>
                        <p className="text-gray-400 text-[10px] mb-5">Click below to view the overall report for the week.</p>
                        <button className="bg-[#6366F1] text-white px-7 py-3 rounded-sm h-[30px] flex items-center justify-center font-medium transition-colors">
                            <Link to="/dashboard" className="flex items-center justify-center text-[12px]">
                                Show Weekly Report
                            </Link>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
