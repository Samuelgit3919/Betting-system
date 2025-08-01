

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Database, Headphones, Bell } from "lucide-react"
import logo from "../../assets/logo (1).png"
import { Link } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempted with:", { username, password })
    }

    return (
        <div className="w-full h-screen mx-auto flex items-center justify-center ">
            <div className="flex min-h-[360px] max-w-[720px]  justify-center shadow-lg items-center ">
                {/* Left Side - Welcome Section */}
                <div className="hidden md:flex flex-1 px-4 bg-gradient-to-br bg-[#3040D6]  flex-col justify-center items-center min-h-90 text-white">
                    <div className="ml-6 pt-2  px-[15px] w-full ">
                        <h1 className="text-3xl w-full font-light">Welcome to Kiron</h1>
                        <h2 className="text-3xl font-light mb-8">Intercative</h2>
                        <p className="text-xs mb-4 opacity-90">Please login to continue</p>
                    </div>
                    {/* Hexagonal Icons */}
                    <div className="flex flex-col justify-center items-center ">
                        <div className="flex space-x-1 text-white ">
                            <svg width="72" height="81" viewBox="0 0 152 169" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Group" transform="translate(2.000000, 2.000000)" stroke="#A1A9ED" strokeWidth="3">
                                        <path d="M74,117.371134 L74,158.723567 C74,162.037275 71.3137085,164.723567 68,164.723567 C66.9452118,164.723567 65.9090627,164.445504 64.995996,163.917406 L6.67495026,130.185774 L6.67495026,130.185774 C2.54398439,127.796512 1.42108547e-14,123.386278 1.42108547e-14,118.614125 L1.42108547e-14,48.436129 C1.42108547e-14,43.6639756 2.54398439,39.2537412 6.67495026,36.8644799 L67.3072083,1.79609278 C71.4477337,-0.598697595 76.5522663,-0.598697595 80.6927917,1.79609278 L141.32505,36.8644799 C145.456016,39.2537412 148,43.6639756 148,48.436129 L148,118.614125 C148,123.386278 145.456016,127.796512 141.32505,130.185774 L92.2812226,158.551663" id="Path" strokeLinecap="round"></path>
                                        <path d="M108.882866,90.7418658 C109.714261,87.6976379 110.158112,84.4934359 110.158112,81.185567 C110.158112,61.2008302 93.9572813,45 73.9725445,45 C53.9878077,45 37.7869775,61.2008302 37.7869775,81.185567 C37.7869775,97.3610095 48.4003337,111.05757 63.0430857,115.691287" id="Path" strokeLinecap="round"></path>
                                        <path d="M73.9725445,117.371134 C77.5908988,117.371134 81.0852119,116.840051 84.3817866,115.851582 C89.8928309,114.19911 94.8512468,111.268362 98.9127122,107.40366" id="Path" strokeLinecap="round"></path>
                                        <circle id="Oval-Copy" fillOpacity="0.196268575" fill="#A1A9ED" cx="104.127184" cy="99.2783505" r="9.64948454"></circle>
                                        <path d="M120.255984,85.4659665 C128.43855,89.8418956 133.002057,93.9015871 132.226834,96.7947568 C131.38817,99.9246931 124.455699,101.112837 113.853361,100.515516" id="Path" strokeLinecap="round"></path>
                                        <path d="M94.0573111,98.0477535 C86.8513781,96.7649447 79.0016836,95.0204726 70.8507066,92.8364249 C38.6777508,84.2157074 13.9941115,72.0109683 15.718255,65.5763772 C16.4982546,62.6653791 22.5493576,61.4340187 31.9215354,61.7565326" id="Path" strokeLinecap="round"></path>
                                        <line x1="96.5" y1="22.5" x2="96.5" y2="35.5278784" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="96.5" y1="22.5" x2="96.5" y2="35.5278784" id="Line-6-Copy" strokeLinecap="round" transform="translate(96.500000, 29.000000) rotate(-270.000000) translate(-96.500000, -29.000000) "></line>
                                        <line x1="38.5" y1="38.3" x2="38.5" y2="46.1167271" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="38.4916365" y1="38.2916365" x2="38.4916365" y2="46.1083635" id="Line-6-Copy" strokeLinecap="round" transform="translate(38.491636, 42.200000) rotate(-270.000000) translate(-38.491636, -42.200000) "></line>
                                        <line x1="98" y1="122.266667" x2="98" y2="129.214868" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="97.9925658" y1="122.259232" x2="97.9925658" y2="129.207434" id="Line-6-Copy" strokeLinecap="round" transform="translate(97.992566, 125.733333) rotate(-270.000000) translate(-97.992566, -125.733333) "></line>
                                        <line x1="40.5" y1="122.433333" x2="40.5" y2="133.724161" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="40.4879193" y1="122.421253" x2="40.4879193" y2="133.712081" id="Line-6-Copy" strokeLinecap="round" transform="translate(40.487919, 128.066667) rotate(-270.000000) translate(-40.487919, -128.066667) "></line>
                                    </g>
                                </g>
                            </svg>

                            <svg width="72" height="81" viewBox="0 0 152 169" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Group" transform="translate(2.000000, 2.000000)" stroke="#A1A9ED" strokeWidth="3">
                                        <path d="M74,123.060611 L74,158.723567 C74,162.037275 71.3137085,164.723567 68,164.723567 C66.9452118,164.723567 65.9090627,164.445504 64.995996,163.917406 L6.67495026,130.185774 L6.67495026,130.185774 C2.54398439,127.796512 1.42108547e-14,123.386278 1.42108547e-14,118.614125 L1.42108547e-14,48.436129 C1.42108547e-14,43.6639756 2.54398439,39.2537412 6.67495026,36.8644799 L67.3072083,1.79609278 C71.4477337,-0.598697595 76.5522663,-0.598697595 80.6927917,1.79609278 L141.32505,36.8644799 C145.456016,39.2537412 148,43.6639756 148,48.436129 L148,118.614125 C148,123.386278 145.456016,127.796512 141.32505,130.185774 L92.2812226,158.551663" id="Path-Copy-2" strokeLinecap="round"></path>
                                        <path d="M104.072464,59.4347826 L107.42029,59.4347826 C110.501879,59.4347826 113,61.9329039 113,65.0144928 L113,72.826087 C113,75.9076758 110.501879,78.4057971 107.42029,78.4057971 L104.072464,78.4057971" id="Path" fill="#A1A9ED" fillOpacity="0.2"></path>
                                        <path d="M36,59.4347826 L39.3478261,59.4347826 C42.4294149,59.4347826 44.9275362,61.9329039 44.9275362,65.0144928 L44.9275362,72.826087 C44.9275362,75.9076758 42.4294149,78.4057971 39.3478261,78.4057971 L36,78.4057971" id="Path-Copy-8" fill="#A1A9ED" fillOpacity="0.2" transform="translate(40.463768, 68.920290) scale(-1, 1) translate(-40.463768, -68.920290) "></path>
                                        <path d="M73.942029,36 L75.057971,36 C91.6985507,36 105.188406,49.4898551 105.188406,66.1304348 L105.188406,74.2608696 C105.188406,86.4111341 95.3386703,96.2608696 83.1884058,96.2608696 L65.8115942,96.2608696 C53.6613297,96.2608696 43.8115942,86.4111341 43.8115942,74.2608696 L43.8115942,66.1304348 C43.8115942,49.4898551 57.3014493,36 73.942029,36 Z" id="Rectangle"></path>
                                        <path d="M61.6231884,54.9710145 L87.3768116,54.9710145 C92.8996591,54.9710145 97.3768116,59.448167 97.3768116,64.9710145 L97.3768116,71.1521739 C97.3768116,80.0887815 90.1322598,87.3333333 81.1956522,87.3333333 L67.8043478,87.3333333 C58.8677402,87.3333333 51.6231884,80.0887815 51.6231884,71.1521739 L51.6231884,64.9710145 C51.6231884,59.448167 56.1003409,54.9710145 61.6231884,54.9710145 Z" id="Rectangle" fill="#A1A9ED" fillOpacity="0.2"></path>
                                        <path d="M98.1625549,96.4072839 C104.039008,97.3212203 108.536232,102.403535 108.536232,108.536232 L108.536232,118.134734 C108.536232,119.211784 107.767028,120.135188 106.707715,120.329844 C106.055061,120.449774 105.513749,120.546295 105.083779,120.619408 C95.9922338,122.165353 85.5737028,123.043478 74.5,123.043478" id="Path" strokeLinecap="round"></path>
                                        <path d="M63.9958478,122.775649 C56.839568,122.406752 50.0823079,121.667204 43.9319499,120.622082 C43.4981804,120.548372 42.951644,120.450947 42.2923407,120.329807 C41.2329855,120.135184 40.4637681,119.211754 40.4637681,118.134669 L40.4637681,108.536232 C40.4637681,102.446055 44.8988464,97.391746 50.715414,96.426894" id="Path" strokeLinecap="round"></path>
                                        <path d="M100.724638,87.6057924 C100.724638,97.4668767 92.7306494,105.188406 82.8695652,105.188406 L66.1304348,105.188406 C56.2693506,105.188406 48.2753623,97.4668767 48.2753623,87.6057924" id="Path" strokeLinecap="round"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="flex space-x-1 text-white mt-[-16px]">

                            <svg width="72" height="81" viewBox="0 0 152 169" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Group" transform="translate(2.000000, 2.000000)" stroke="#A1A9ED" strokeWidth="3">
                                        <path d="M74,102.060611 L74,158.723567 C74,162.037275 71.3137085,164.723567 68,164.723567 C66.9452118,164.723567 65.9090627,164.445504 64.995996,163.917406 L6.67495026,130.185774 L6.67495026,130.185774 C2.54398439,127.796512 1.42108547e-14,123.386278 1.42108547e-14,118.614125 L1.42108547e-14,48.436129 C1.42108547e-14,43.6639756 2.54398439,39.2537412 6.67495026,36.8644799 L67.3072083,1.79609278 C71.4477337,-0.598697595 76.5522663,-0.598697595 80.6927917,1.79609278 L141.32505,36.8644799 C145.456016,39.2537412 148,43.6639756 148,48.436129 L148,118.614125 C148,123.386278 145.456016,127.796512 141.32505,130.185774 L92.2812226,158.551663" id="Path-Copy-3" strokeLinecap="round"></path>
                                        <path d="M51,49 L119,49 C120.104569,49 121,49.8954305 121,51 L121,92 C121,93.1045695 120.104569,94 119,94 L51,94 L51,94" id="Path" fill="#A1A9ED" fillOpacity="0.2"></path>
                                        <line x1="50.5" y1="117.664666" x2="50.5" y2="46" id="Line-2" strokeLinecap="round"></line>
                                        <path d="M90.239435,81.7782712 C90.0631269,82.1676449 89.8758447,82.5512259 89.6779671,82.9286394 L82.2989672,82.9286393 L81.8937728,82.0669236 L78.1172716,83.9875645 L76.5591632,79.8394848 C76.3961623,79.1332341 76.5739129,78.396551 77.0393222,77.8413752 L79.8721037,74.4622162 C79.8249919,73.8746857 79.8009823,73.2808202 79.8009823,72.6814838 C79.8009823,67.7927344 81.3963573,63.2674855 84.107847,59.5756058 C84.5362871,59.0098353 84.997813,58.7370453 85.4095325,58.6086382 C86.0930507,58.3954624 86.7419904,58.5264664 87.2751427,58.9131117 C90.61381,63.2761567 92.1990177,67.7991512 92.1990177,72.6814838 C92.1990177,73.2808202 92.1750081,73.8746857 92.1278963,74.4622162 L94.9606778,77.8413752 C95.3806819,78.3423882 95.5664172,78.9912204 95.4788634,79.6321076 L94.9309945,83.6424664 L90.239435,81.7782712 Z" id="Path" fill="#FFFFFF" fillOpacity="0"></path>
                                        <path d="M18.4450668,124.33815 C20.3880749,122.496562 22.421736,120.749671 24.5386602,119.104867 L22.349674,115.734124 C21.7480823,114.807754 22.0113671,113.569097 22.9377371,112.967505 L31.3244427,107.521115 C32.2508127,106.919523 33.4894703,107.182808 34.0910619,108.109178 L36.2893205,111.494199 C43.9325843,107.429769 52.2997247,104.546693 61.1471982,103.088517" id="Path" strokeLinecap="round"></path>
                                        <path d="M74.5,102 C86.2343886,102 97.389559,104.479928 107.469997,108.944271 L109.522759,105.388784 C110.075043,104.432199 111.298224,104.104449 112.254809,104.656733 L125.245191,112.156733 C126.201776,112.709018 126.529526,113.932199 125.977241,114.888784 L123.825459,118.615781 C126.097192,120.345426 128.275354,122.191655 130.351025,124.145546" id="Path" strokeLinecap="round"></path>
                                        <line x1="82.5" y1="19.5" x2="82.5" y2="32.5278784" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="82.5" y1="19.5" x2="82.5" y2="32.5278784" id="Line-6-Copy" strokeLinecap="round" transform="translate(82.500000, 26.000000) rotate(-270.000000) translate(-82.500000, -26.000000) "></line>
                                        <line x1="30.5" y1="40.3" x2="30.5" y2="48.1167271" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="30.4916365" y1="40.2916365" x2="30.4916365" y2="48.1083635" id="Line-6-Copy" strokeLinecap="round" transform="translate(30.491636, 44.200000) rotate(-270.000000) translate(-30.491636, -44.200000) "></line>
                                        <line x1="17.5" y1="78.4333333" x2="17.5" y2="89.7241613" id="Line-6" strokeLinecap="round"></line>
                                        <line x1="17.4879193" y1="78.4212527" x2="17.4879193" y2="89.7120807" id="Line-6-Copy" strokeLinecap="round" transform="translate(17.487919, 84.066667) rotate(-270.000000) translate(-17.487919, -84.066667) "></line>
                                    </g>
                                </g>
                            </svg>
                        </div>

                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-1 h-90  bg-white flex-col justify-center items-center px-12 pl-10">

                    <div className="w-full">
                        {/* Logo */}
                        <div className="mb-8 text-center">
                            <div className="text-3xl font-bold text-black mb-1">
                                <span className="text-green-500">
                                    <img src={logo} alt="" width={160} />
                                </span>
                            </div>

                        </div>
                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-2 w-full max-w-lg mx-auto ">
                            <div>
                                <Label htmlFor="username" className="text-sm text-gray-700">
                                    <span className="text-[#5183E8] text-xs relative -top-1">*</span><span className="text-[11px] font-[400] text-black -ml-1 mb-1.5">Username</span>
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="placeholder:text-xs inline-block font-roboto text-[14px] font-normal  text-[#0c1e29] 
                                        h-[30px] w-[294px] p-[4px_8px] 
                                        border-[#9eaab5] rounded-[2px] focus:outline-none focus:ring-0 focus:bg-transparent bg-white"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm">
                                    <span className="text-[#5183E8] text-xs relative -top-1">*</span><span className="text-[11px] font-[400] -ml-1 text-black mb-1.5">Password</span>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="placeholder:text-xs inline-block font-roboto text-[14px] font-normal leading-6 text-[#0c1e29] 
                                    bg-transparent h-[30px] w-[294px] p-[4px_8px] m-0 
                                    border border-[#9eaab5] rounded-[2px] 
                                    max-w-none max-h-none min-w-0 min-h-0 
                                    static top-auto bottom-auto left-auto right-auto 
                                    float-none clear-none z-auto 
                                    list-disc list-outside 
                                    border-separate border-spacing-0 caption-top 
                                    overflow-clip cursor-text visible 
                                    transform-none transition-all box-border resize-none 
                                    text-clip break-normal shadow-none "
                                />
                            </div>

                            <div className="flex justify-center">

                                <Link to="/dashboard" className="text-white flex items-center justify-center ">
                                    <button
                                        type="submit"
                                        className="font-roboto text-[14px] font-normal leading-6 tracking-normal text-center align-middle 
                                        text-white bg-blue-700 border hover:bg-blue-800
                                        h-[28px] w-[80px] rounded-[3px]
                                        inline-block box-border cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}
