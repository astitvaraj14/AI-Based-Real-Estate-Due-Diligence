import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import toast from "react-hot-toast";
import api from "../services/api";

export default function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const resetPassword = async (e) => {

    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      toast.success("Password updated successfully.");

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Unable to reset password."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white flex-col justify-between p-12">

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

                <FaBuilding className="text-3xl" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Real Estate AI
                </h1>

                <p className="text-blue-200">
                  Due Diligence Platform
                </p>

              </div>

            </div>

            <h2 className="text-5xl font-bold mt-20 leading-tight">

              Create Your
              <br />

              New Password

            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">

              Choose a strong password
              to keep your account secure.
              Your password protects your
              property records and sensitive data.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            {[
              "Strong Password",
              "Secure Login",
              "Encrypted Data",
              "Safe Account",
            ].map((item) => (

              <div
                key={item}
                className="bg-white/10 rounded-2xl p-5 backdrop-blur"
              >

                <FaCheckCircle className="text-green-300 text-2xl mb-4" />

                <p>{item}</p>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="w-full lg:w-1/2 flex justify-center items-center px-10">

          <div className="w-full max-w-md">

            <div className="flex justify-center">

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

                <FaLock className="text-5xl text-blue-600" />

              </div>

            </div>

            <h1 className="text-center text-4xl font-bold mt-8">

              Reset Password

            </h1>

            <p className="text-center text-gray-500 mt-4">

              Create a new secure password
              for your account.

            </p>

            <form
              onSubmit={resetPassword}
              className="mt-10"
            >

              <label className="font-semibold">

                New Password

              </label>

              <div className="relative mt-3">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <label className="font-semibold block mt-6">

                Confirm Password

              </label>

              <div className="relative mt-3">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
              {/* Update Password Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-lg font-semibold transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    Update Password
                    <FaArrowRight />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}

            <div className="flex items-center my-8">

              <div className="flex-1 border-t border-gray-300"></div>

              <span className="mx-4 text-gray-400 text-sm uppercase">

                Password Security

              </span>

              <div className="flex-1 border-t border-gray-300"></div>

            </div>

            {/* Security Card */}

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex gap-4">

              <FaShieldAlt className="text-blue-600 text-3xl mt-1" />

              <div>

                <h3 className="font-bold text-gray-800">
                  Create a Strong Password
                </h3>

                <ul className="text-gray-500 text-sm mt-2 space-y-1">

                  <li>• At least 8 characters</li>

                  <li>• Include uppercase & lowercase letters</li>

                  <li>• Include numbers</li>

                  <li>• Include special characters</li>

                </ul>

              </div>

            </div>

            {/* Back */}

            <div className="text-center mt-8">

              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                ← Back to Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}
