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
import CashierDetail from "./components/Dashboard/Cashier/CashierDetail"
import BetSlipDetail from "./components/Dashboard/BetSlip/BetSlipDetail"
import CreateEvent from "./components/Dashboard/Events/CreateEvent"
import CreateCashier from "./components/Dashboard/Cashier/CreateCashier"
import CreateNewShop from "./components/Dashboard/Shop/CreateNewShop"


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
          <Route path="shop/createShop" element={<CreateNewShop />} />
          <Route path="shops/:shopId" element={<ShopDetail />} />

          <Route path="events" element={<Events />} />
          <Route path="events/createEvent" element={<CreateEvent />} />
          <Route path="/events/:eventId" element={<EventDetail />} />

          <Route path="cashier" element={<Cashier />} />
          <Route path="cashier/createCashier" element={<CreateCashier />} />
          <Route path="cashier/:cashierId" element={<CashierDetail />} />

          <Route path="betSlip" element={<BetSlip />} />
          <Route path="betSlip/:betSlipId" element={<BetSlipDetail />} />


          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
