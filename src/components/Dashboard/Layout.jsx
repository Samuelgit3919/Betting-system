import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
// import HomeDashboard from './HomeDashboard'

const Layout = () => {
    return (
        <div className="flex h-screen w-full">
            <div className='w-[15%] '>
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 w-[100%]  md:w-[85%] ">
                <Header />
                <main className="bg-[#F8F9F9] h-full">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout