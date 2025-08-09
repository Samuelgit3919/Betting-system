import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Account/Login"
import Layout from "./components/Dashboard/Layout"
import Dashboard from "./components/Dashboard/Dashboard"
import Shop from "./components/Dashboard/Shop/Shop"
import Events from "./components/Dashboard/Events/Events"
import Cashier from "./components/Dashboard/Cashier/Cashier"
import BetSlip from "./components/Dashboard/BetSlip/BetSlip"
import HomeDashboard from "./components/Dashboard/HomeDashboard"
import Report from "./components/Dashboard/Report/Report"
import EventDetail from "./components/Dashboard/Events/EventDetail"
import ShopDetail from "./components/Dashboard/Shop/ShopDetail"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shops/:shopId" element={<ShopDetail />} />
          <Route path="events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="cashier" element={<Cashier />} />
          <Route path="betSlip" element={<BetSlip />} />
          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
