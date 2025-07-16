import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Account/Login"
import Layout from "./components/Dashboard/Layout"

import Dashboard from "./components/Dashboard/Dashboard"
import Shop from "./components/Dashboard/Shop/Shop"
import Events from "./components/Dashboard/Events/Events"
import Cashier from "./components/Dashboard/Cashier/Cashier"
import BetSlip from "./components/Dashboard/BetSlip/BetSlip"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shop" element={<Shop />} />
          <Route path="events" element={<Events />} />
          <Route path="cashier" element={<Cashier />} />
          <Route path="betSlip" element={<BetSlip />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
