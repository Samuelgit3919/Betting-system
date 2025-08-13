import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
    CalendarIcon,
    BarChart,
    DollarSign,
    RefreshCw,
    UserX,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    CartesianGrid,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';

// Mock data for charts and tables
const ggrTrendData = [
    { name: 'Mon', ggr: 0 },
    { name: 'Tue', ggr: 0 },
    { name: 'Wed', ggr: 5000 },
    { name: 'Thu', ggr: 3000 },
    { name: 'Fri', ggr: 1800 },
    { name: 'Sat', ggr: 0 },
    { name: 'Sun', ggr: 0 },
];

const topShopsData = [
    { name: 'Falco3', value: 400, color: '#6366F1' },
    { name: 'Volt15', value: 200, color: '#EC4899' },
    { name: 'Volt10', value: 150, color: '#22C55E' },
    { name: 'Volt13', value: 100, color: '#000000' },
    { name: 'Others', value: 50, color: '#F59E0B' },
];

const topPerformingShops = [
    { shop: 'Falco3', ggr: 'ETB 3,810', tickets: 1591 },
    { shop: 'Volt15', ggr: 'ETB 1,662', tickets: 290 },
    { shop: 'Volt10', ggr: 'ETB 3,600', tickets: 248 },
    { shop: 'Volt13', ggr: 'ETB -85', tickets: 18 },
];

const bannedCashiers = [
    { cashier: 'Volt3.cashier9', shop: 'Volt3' },
    { cashier: 'Volt4.cashier1', shop: 'Volt4' },
    { cashier: 'Volt4.cashier3', shop: 'Volt4' },
    { cashier: 'Volt4.cashier6', shop: 'Volt4' },
];

const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white border border-gray-200 rounded-md shadow-sm text-[12px]">
                <p className="font-semibold">{`Day: ${label}`}</p>
                <p className="text-purple-600">{`GGR: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-2 bg-white border border-gray-200 rounded-md shadow-sm text-[12px]">
                <p className="font-semibold" style={{ color: data.color }}>
                    {`Shop: ${data.name}`}
                </p>
                <p>{`Value: ${data.value}`}</p>
            </div>
        );
    }
    return null;
};

const CustomPieChartLegend = ({ payload }) => {
    if (!payload) return null;
    return (
        <ul className="space-y-0 text-[10px]">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center text-gray-700">
                    <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                    />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};

export default function DashboardPage() {
    const [date, setDate] = useState(new Date('2025-08-08T10:50:00'));
    const [loader, setLoader] = useState(true); // Start with loader true
    const [error, setError] = useState(null);

    // Simulate data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                // Simulate API call with a delay
                await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
                // In a real app, replace with actual API call:
                // const response = await fetch('/api/dashboard-data');
                // const data = await response.json();
                setLoader(false);
            } catch (err) {
                setError('Failed to load dashboard data.', err);
                setLoader(false);
            }
        };

        fetchData();
    }, []);

    // Handle refresh button click
    const handleRefresh = () => {
        setLoader(true);
        setError(null);
        // Simulate data refresh
        setTimeout(() => {
            setLoader(false);
        }, 2000); // 2-second delay
    };

    return (
        <div className="min-h-screen overflow-y-visible bg-gray-50 p-6 md:py-4 md:px-4 lg:py-6 lg:px-4 lg:pl-8">
            {loader ? (
                <div className="flex items-center justify-center">
                    <ScaleLoader color="#6366F1" loading={loader} height={50} width={5} radius={2} margin={2} />
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-red-600 text-[14px]">{error}</div>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold text-gray-900">Overview</h1>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className={cn(
                                        'w-[160px] h-[20px] text-[10px] cursor-pointer justify-center text-left font-normal rounded-full hover:bg-gray-100 bg-white text-black px-0 py-0',
                                        !date && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className="mr-1 h-1 w-1 text-indigo-700" />
                                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:grid-cols-3 md:gap-4 mb-6">
                        <Card className="px-2 h-[80px] flex items-center justify-between shadow-md bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-2 items-center justify-center">
                                    <div className="p-2 rounded-full bg-[#EFEFFE] text-[#8A8CF5] mb-2">
                                        <BarChart className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col mb-4 items-start justify-center">
                                        <div className="text-sm font-bold text-gray-900">4</div>
                                        <div className="text-gray-500 text-[11px]">Active Shops</div>
                                    </div>
                                </div>
                                <div className="py-0.5 px-2 bg-[#F4F4FE] rounded-full">
                                    <span className="text-[9px] font-medium text-[#6366F1] bg-[#E5E5FD] px-2 py-0.5 rounded-full">
                                        14.3% of Total
                                    </span>
                                </div>
                            </div>
                        </Card>

                        <Card className="px-2 h-[80px] flex items-center justify-between shadow-md bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-2 items-center justify-center">
                                    <div className="p-2 rounded-full bg-[#E8F9EF] text-[#22C55E] mb-2">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-bold text-gray-900">ETB 1,316</div>
                                        <div className="text-gray-500 text-[10px]">GGR of the Day</div>
                                    </div>
                                </div>
                                <div className="py-0.5 px-2 bg-[#F4F4FE] rounded-full">
                                    <span className="text-[9px] font-medium text-[#22C55E] bg-[#DEEFEE] px-2 py-0.5 rounded-full">
                                        63.9% RTP
                                    </span>
                                </div>
                            </div>
                        </Card>

                        <Card className="px-2 h-[80px] flex items-center justify-between shadow-md bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-2 items-center justify-center">
                                    <div className="p-2 rounded-full bg-[#FEF6D5] text-[#FACC15] mb-2">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-bold text-gray-900">ETB 9,127</div>
                                        <div className="text-gray-500 text-[10px]">GGR of the Week</div>
                                    </div>
                                </div>
                                <div className="py-0.5 px-2 bg-[#F4F4FE] rounded-full">
                                    <span className="text-[9px] font-medium text-[#22C55E] bg-[#DEEFEE] px-2 py-0.5 rounded-full">
                                        88.4% RTP
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1  sm:grid-cols-[62%_36%] gap-3 md:gap-6 mb-6">
                        <Card className="px-2 shadow-md h-[280px] bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-0">
                                <h2 className="text-[10px] pl-8 font-semibold text-gray-900">GGR Trend (Weekly)</h2>
                                <button
                                    className="flex items-center text-gray-500 text-[12px] hover:text-gray-700"
                                    onClick={handleRefresh}
                                    disabled={loader}
                                >
                                    <RefreshCw className="w-3 h-3 mr-1" />
                                    <span className="text-[10px]">Refresh</span>
                                </button>
                            </div>
                            <div className="h-46 text-[9px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={ggrTrendData} margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical horizontal stroke="#e0e0e0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} domain={[0, 6000]} ticks={[0, 1500, 3000, 4500, 6000]} />
                                        <Tooltip content={<CustomLineTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="ggr"
                                            stroke="#6366F1"
                                            strokeWidth={2}
                                            dot={{ r: 3, fill: '#6366F1' }}
                                            activeDot={{ r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <Card className="px-2 md:px-6 shadow-md h-[280px] bg-white rounded-lg border border-gray-100">
                            <h2 className="text-[12px] font-semibold text-gray-900 mb-4">Top Shops</h2>
                            <div className="flex justify-center items-center h-54">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={topShopsData}
                                            cx="40%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={50}
                                            fill="#8884d8"
                                            paddingAngle={1}
                                            dataKey="value"
                                        >
                                            {topShopsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Legend
                                            content={<CustomPieChartLegend />}
                                            layout="vertical"
                                            align="right"
                                            verticalAlign="middle"
                                            wrapperStyle={{ paddingLeft: '30px', width: '110px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>


                    <div className="grid grid-cols-1 gap-3  sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
                        <Card className="py-6 px-4 h-[295px] shadow-md bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[12px] font-semibold text-gray-900">Top Performing Shops</h2>
                                <Link to="/shop" className="text-[12px] text-blue-600 hover:underline">
                                    See all
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left table-auto border">
                                    <thead bgcolor="#F9F9F9" className="hover:bg-[#F2F2F2]">
                                        <tr className="text-gray-500 text-[12px] border">
                                            <th className="py-2 px-4 font-normal">Shop</th>
                                            <th className="py-2 px-4 font-normal">GGR</th>
                                            <th className="py-2 px-4 font-normal">Tickets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topPerformingShops.map((shop, index) => (
                                            <tr key={index} className="border-b last:border-b-0 hover:bg-[#FCFCFC]">
                                                <td className="py-3 px-4 text-[11px] flex items-center text-gray-900">
                                                    <span className="mr-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#6366F1"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                                        </svg>
                                                    </span>
                                                    {shop.shop}
                                                </td>
                                                <td className="py-3 text-[11px] px-4 text-gray-700">{shop.ggr}</td>
                                                <td className="py-3 px-4 text-gray-700 text-[11px]">{shop.tickets}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <Card className="py-6 px-4 h-[295px] shadow-md bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[12px] font-semibold text-gray-900">Banned Cashiers</h2>
                                <Link to="/cashier" className="text-[12px] text-blue-600 hover:underline">
                                    See all
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left table-auto border">
                                    <thead bgcolor="#F9F9F9" className="hover:bg-[#F2F2F2]">
                                        <tr className="text-gray-500 text-[12px] border-b">
                                            <th className="py-2 text-[12px] px-4 font-normal">Cashier</th>
                                            <th className="py-2 text-[12px] px-4 font-normal">Shop</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bannedCashiers.map((cashier, index) => (
                                            <tr key={index} className="border-b last:border-b-0 hover:bg-[#FCFCFC]">
                                                <td className="py-3 px-4 text-[11px] flex items-center text-gray-900">
                                                    <UserX className="w-4 h-4 mr-2 text-red-500" />
                                                    {cashier.cashier}
                                                </td>
                                                <td className="py-3 px-4 text-[11px] text-gray-700">{cashier.shop}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}