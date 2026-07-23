import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FaBuilding,
  FaEnvelope,
  FaKey,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";
import api from "../services/api";

export default function VerifyOtp() {

  const navigate = useNavigate();
  const location = useLocation();

  const [email] = useState(location.state?.email || "");

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const verifyOtp = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success("OTP verified successfully.");

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Invalid OTP."
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

              Verify Your
              <br />
              Email OTP

            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">

              Enter the One-Time Password sent
              to your registered email address
              to securely continue with your
              password reset process.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            {[
              "Email Verification",
              "Secure OTP",
              "Password Recovery",
              "Encrypted Process",
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

                <FaKey className="text-5xl text-blue-600" />

              </div>

            </div>

            <h1 className="text-center text-4xl font-bold mt-8">

              Verify OTP

            </h1>

            <p className="text-center text-gray-500 mt-4">

              Enter the OTP sent to your registered email.

            </p>

            <form
              onSubmit={verifyOtp}
              className="mt-10"
            >

              <label className="font-semibold">

                Registered Email

              </label>

              <div className="relative mt-3">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full h-14 rounded-xl border border-gray-300 bg-gray-100 pl-12 pr-4"
                />

              </div>

              <label className="font-semibold block mt-6">

                One-Time Password

              </label>

              <input
                type="text"
                placeholder="Enter 6 Digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                maxLength={6}
                className="w-full h-14 mt-3 rounded-xl border border-gray-300 text-center text-2xl tracking-[10px] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                required
              />
                            {/* Verify OTP Button */}

                            <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-8 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-lg font-semibold transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  "Verifying..."
                ) : (
                  <>
                    Verify OTP
                    <FaArrowRight />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}

            <div className="flex items-center my-8">

              <div className="flex-1 border-t border-gray-300"></div>

              <span className="mx-4 text-gray-400 text-sm uppercase">

                Secure Verification

              </span>

              <div className="flex-1 border-t border-gray-300"></div>

            </div>

            {/* Security Card */}

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex gap-4">

              <FaShieldAlt className="text-blue-600 text-3xl mt-1" />

              <div>

                <h3 className="font-bold text-gray-800">
                  Your OTP is Secure
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">

                  Your One-Time Password is valid for
                  5 minutes and can only be used once.
                  Never share it with anyone.

                </p>

              </div>

            </div>

            {/* Back */}

            <div className="text-center mt-8">

              <Link
                to="/forgot-password"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                ← Back to Forgot Password
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}