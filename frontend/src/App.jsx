import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import Dashboard from "./pages/Dashboard";
import PropertySearch from "./pages/PropertySearch";
import DueDiligence from "./pages/DueDiligence";
import AddProperty from "./pages/AddProperty";
import AddressValidation from "./pages/AddressValidation";
import Reports from "./pages/Reports";
import Comparables from "./pages/Comparables";
import RiskMonitoring from "./pages/RiskMonitoring";
import AuditLog from "./pages/AuditLog";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

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
          path="/property-search"
          element={
            <ProtectedRoute>
              <PropertySearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/due-diligence"
          element={
            <ProtectedRoute>
              <DueDiligence />
            </ProtectedRoute>
          }
        />

        <Route
          path="/due-diligence/:id"
          element={
            <ProtectedRoute>
              <DueDiligence />
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
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comparables"
          element={
            <ProtectedRoute>
              <Comparables />
            </ProtectedRoute>
          }
        />

        <Route
          path="/risk-monitoring"
          element={
            <ProtectedRoute>
              <RiskMonitoring />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit-log"
          element={
            <ProtectedRoute>
              <AuditLog />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;