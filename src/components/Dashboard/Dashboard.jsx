
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, DollarSign, Calendar, RefreshCw, User } from "lucide-react"
import { Line, Doughnut } from "react-chartjs-2"
import { motion } from "framer-motion"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

export default function Dashboard() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }

    const cardHoverVariants = {
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    }

    // Chart data
    const lineChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "GGR Trend",
                data: [25000, 50000, 10000, 8000, 5000, 3000, 2000],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#3b82f6",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    }

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                borderColor: "#3b82f6",
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `ETB ${context.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: {
                        size: 12,
                    },
                    callback: (value) => (value >= 1000 ? value / 1000 + "K" : value),
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
        animation: {
            duration: 2000,
            easing: "easeInOutQuart",
        },
    }

    const doughnutData = {
        labels: ["Volt3", "Falco8", "Falco6", "Falco3", "Others"],
        datasets: [
            {
                data: [45, 25, 15, 10, 5],
                backgroundColor: ["#3b82f6", "#ec4899", "#10b981", "#1f2937", "#eab308"],
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: "#ffffff",
            },
        ],
    }

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                borderColor: "#3b82f6",
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: (context) => `${context.label}: ${context.parsed}%`,
                },
            },
        },
        cutout: "60%",
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 2000,
            easing: "easeInOutQuart",
        },
    }

    // Sample data for tables
    const topShopsData = [
        { name: "Volt3", ggr: "ETB 61,268", tickets: "7274", color: "bg-blue-500" },
        { name: "Falco8", ggr: "ETB 6,498", tickets: "3318", color: "bg-pink-500" },
        { name: "Falco6", ggr: "ETB 344", tickets: "2793", color: "bg-green-500" },
        { name: "Falco3", ggr: "ETB 6,102", tickets: "2204", color: "bg-gray-800" },
    ]

    const donutLegendData = [
        { name: "Volt3", color: "bg-blue-500" },
        { name: "Falco8", color: "bg-pink-500" },
        { name: "Falco6", color: "bg-green-500" },
        { name: "Falco3", color: "bg-gray-800" },
        { name: "Others", color: "bg-yellow-500" },
    ]

    return (
        <motion.div className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div className="flex justify-between items-center" variants={itemVariants}>
                <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Wednesday, July 16, 2025
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
                {/* Active Shops */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card className="cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <motion.div
                                            className="text-3xl font-bold text-gray-900"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                        >
                                            1
                                        </motion.div>
                                        <div className="text-sm text-gray-600">Active Shops</div>
                                    </div>
                                    <div className="flex items-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        >
                                            <BarChart3 className="w-8 h-8 text-blue-500" />
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                                            4.8% of Total
                                        </Badge>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* GGR of the Day */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card className="cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <motion.div
                                            className="text-3xl font-bold text-gray-900"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                                        >
                                            ETB 10
                                        </motion.div>
                                        <div className="text-sm text-gray-600">GGR of the Day</div>
                                    </div>
                                    <div className="flex items-center">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        >
                                            <DollarSign className="w-8 h-8 text-green-500" />
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                                            0.0% RTP
                                        </Badge>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* GGR of the Week */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card className="cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <motion.div
                                            className="text-3xl font-bold text-gray-900"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                                        >
                                            ETB 91,510
                                        </motion.div>
                                        <div className="text-sm text-gray-600">GGR of the Week</div>
                                    </div>
                                    <div className="flex items-center">
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        >
                                            <TrendingUp className="w-8 h-8 text-yellow-500" />
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                                            94.7% RTP
                                        </Badge>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Charts Section */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
                {/* GGR Trend Chart */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">GGR Trend (Weekly)</CardTitle>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="ghost" size="sm">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Refresh
                                    </Button>
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <motion.div
                                    className="h-64"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    <Line data={lineChartData} options={lineChartOptions} />
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Top Shops Donut Chart */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Top Shops</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center">
                                    {/* Donut Chart */}
                                    <motion.div
                                        className="relative w-48 h-48"
                                        initial={{ opacity: 0, rotate: -180 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        transition={{ delay: 1.2, duration: 1 }}
                                    >
                                        <Doughnut data={doughnutData} options={doughnutOptions} />
                                    </motion.div>

                                    {/* Legend */}
                                    <motion.div
                                        className="ml-8 space-y-2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.5, staggerChildren: 0.1 }}
                                    >
                                        {donutLegendData.map((item, index) => (
                                            <motion.div
                                                key={item.name}
                                                className="flex items-center space-x-2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.5 + index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                                <span className="text-sm text-gray-600">{item.name}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Tables Section */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
                {/* Top Performing Shops */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Top Performing Shops</CardTitle>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="link" className="text-blue-600 p-0">
                                        See all
                                    </Button>
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                                        <div>Shop</div>
                                        <div>GGR</div>
                                        <div>Tickets</div>
                                    </div>
                                    {topShopsData.map((shop, index) => (
                                        <motion.div
                                            key={shop.name}
                                            className="grid grid-cols-3 gap-4 text-sm"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 2 + index * 0.1 }}
                                            whileHover={{
                                                backgroundColor: "rgba(59, 130, 246, 0.05)",
                                                scale: 1.02,
                                                transition: { duration: 0.2 },
                                            }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <motion.div
                                                    className={`w-3 h-3 rounded ${shop.color}`}
                                                    whileHover={{ scale: 1.2 }}
                                                ></motion.div>
                                                <span>{shop.name}</span>
                                            </div>
                                            <div className="font-medium">{shop.ggr}</div>
                                            <div className="text-gray-600">{shop.tickets}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Banned Cashiers */}
                <motion.div variants={itemVariants} whileHover="hover">
                    <motion.div variants={cardHoverVariants}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Banned Cashiers</CardTitle>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="link" className="text-blue-600 p-0">
                                        See all
                                    </Button>
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                                        <div>Cashier</div>
                                        <div>Shop</div>
                                    </div>
                                    <motion.div
                                        className="grid grid-cols-2 gap-4 text-sm"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.5 }}
                                        whileHover={{
                                            backgroundColor: "rgba(239, 68, 68, 0.05)",
                                            scale: 1.02,
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <motion.div
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                            >
                                                <User className="w-4 h-4 text-red-500" />
                                            </motion.div>
                                            <span>Volt3.cashier9</span>
                                        </div>
                                        <div className="text-gray-600">Volt3</div>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
