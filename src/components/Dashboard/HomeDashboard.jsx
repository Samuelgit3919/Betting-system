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
                    <div className="text-center max-w-md">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Dashboard</h1>
                        <p className="text-gray-600 mb-8">Click below to view the overall report for the week.</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            <Link to="/dashboard" className="flex items-center justify-center">
                                Show Weekly Report
                            </Link>
                        </Button>
                    </div>
                </main>

                {/* Floating Message Button */}
                {/* <div className="fixed bottom-6 right-6">
                    <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors">
                        <span className="font-bold text-lg">M</span>
                    </button>
                </div> */}
            </div>
        </div>
    )
}
