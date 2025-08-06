import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
// import HomeDashboard from './HomeDashboard'

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Header />
                <main className="">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout