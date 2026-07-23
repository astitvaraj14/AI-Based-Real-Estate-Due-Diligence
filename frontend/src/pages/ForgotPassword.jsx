import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaEnvelope,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";
import api from "../services/api";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/auth/forgot-password", {
        email,
      });

      toast.success("OTP sent successfully.");

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Unable to send OTP."
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

              Reset Your Password
              <br />
              Securely

            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">

              Forgot your password?
              No worries.
              We'll send a secure OTP
              to your registered email
              to verify your identity.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            {[
              "Secure Verification",
              "Email OTP",
              "Password Recovery",
              "Fast & Safe",
            ].map((item) => (

              <div
                key={item}
                className="bg-white/10 backdrop-blur rounded-2xl p-5"
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

                <FaEnvelope className="text-5xl text-blue-600" />

              </div>

            </div>

            <h1 className="text-center text-4xl font-bold mt-8">

              Forgot Password

            </h1>

            <p className="text-center text-gray-500 mt-4">

              Enter your registered email address
              to receive a One-Time Password.

            </p>

            <form
              onSubmit={sendOtp}
              className="mt-10"
            >

              <label className="font-semibold">

                Email Address

              </label>

              <div className="relative mt-3">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
                              </div>

{/* Send OTP Button */}

<button
  type="submit"
  disabled={loading}
  className="w-full h-14 mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-lg font-semibold transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50"
>
  {loading ? (
    "Sending OTP..."
  ) : (
    <>
      Send OTP
      <FaArrowRight />
    </>
  )}
</button>

</form>

{/* Divider */}

<div className="flex items-center my-8">

<div className="flex-1 border-t border-gray-300"></div>

<span className="mx-4 text-gray-400 text-sm uppercase">

  Secure Recovery

</span>

<div className="flex-1 border-t border-gray-300"></div>

</div>

{/* Security Card */}

<div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 flex gap-4">

<FaShieldAlt className="text-blue-600 text-3xl mt-1" />

<div>

  <h3 className="font-bold text-gray-800">
    Safe Password Recovery
  </h3>

  <p className="text-gray-500 text-sm mt-2 leading-6">

    We'll send a secure One-Time Password (OTP)
    to your registered email address.
    The OTP is valid for 5 minutes.

  </p>

</div>

</div>

{/* Back */}

<div className="text-center mt-8">

<button
  onClick={() => navigate("/login")}
  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
>

  <FaArrowLeft />

  Back to Login

</button>

</div>

</div>

</div>

</div>

</div>

);
}