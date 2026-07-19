import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import AddressValidation from "./pages/AddressValidation";

import ProtectedRoute from "./components/ProtectedRoute";
import PropertySearch from "./pages/PropertySearch";
import Reports from "./pages/Reports";
import Comparables from "./pages/Comparables";
import RiskMonitoring from "./pages/RiskMonitoring";
import AuditLog from "./pages/AuditLog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        
        <Route path="/" element={<Dashboard />} />
        <Route path="/property-search" element={<PropertySearch />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/comparables" element={<Comparables />} />
        <Route path="/risk-monitoring" element={<RiskMonitoring />} />
      <Route path="/audit-log" element={<AuditLog />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <AddressValidation />
            </ProtectedRoute>
          }
        />
        <Route
  path="/test"
  element={<h1 style={{ color: "red", fontSize: "50px" }}>TEST PAGE</h1>}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;