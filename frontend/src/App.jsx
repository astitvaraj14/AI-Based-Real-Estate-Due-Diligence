import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

import SelectRole from "./pages/SelectRole";

import { useNavigate } from "react-router-dom";

import VerifyMobileOtp from "./pages/VerifyMobileOtp";

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Properties from "./pages/properties/Properties";
import PropertyDetails from "./pages/properties/PropertyDetails";
import EditProperty from "./pages/properties/EditProperty";
import AddProperty from "./pages/properties/AddProperty";
import AddressValidation from "./pages/AddressValidation";
import Profile from "./pages/profile/Profile";
import SettingsPage from "./pages/settings/Settings";

// Layout
import DashboardLayout from "./components/layouts/DashboardLayout";

// Auth Guard
import ProtectedRoute from "./components/ProtectedRoute";

import MobileLogin from "./pages/MobileLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect to Login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

<Route
    path="/mobile-login"
    element={<MobileLogin />}
/>

<Route
    path="/verify-mobile-otp"
    element={<VerifyMobileOtp />}
/>

<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />

<Route
  path="/select-role"
  element={<SelectRole />}
/>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

<Route path="/dashboard" element={<Dashboard />} />



          {/* Property Management */}

          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/properties/edit/:id"
            element={<EditProperty />}
          />

          <Route
            path="/add-property"
            element={<AddProperty />}
          />

          {/* Address Validation */}

          <Route
            path="/address"
            element={<AddressValidation />}
          />

          {/* Profile */}

          <Route
            path="/profile"
            element={<Profile />}
          />

<Route
  path="/settings"
  element={<SettingsPage />}
/>

        </Route>

        {/* 404 Page */}

        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="text-center">

                <h1 className="text-6xl font-bold text-red-600">
                  404
                </h1>

                <p className="text-2xl mt-4 font-semibold">
                  Page Not Found
                </p>

                <p className="text-gray-500 mt-2">
                  The page you are looking for doesn't exist.
                </p>

              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;