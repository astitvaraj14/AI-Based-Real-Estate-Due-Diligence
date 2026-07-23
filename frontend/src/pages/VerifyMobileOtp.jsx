import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  FaBuilding,
  FaCheckCircle,
  FaShieldAlt,
  FaKey,
  FaArrowRight,
} from "react-icons/fa";

export default function VerifyMobileOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const mobileNumber = location.state?.mobileNumber || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/mobile/verify-otp",
        {
          mobileNumber,
          otp: otp.trim(),
        }
      );

      login(response.data.token, {
        email: response.data.email,
        role: response.data.role,
      });
      
      toast.success("Login Successful");
      
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

        {/* Left Panel */}

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

              Verify Properties
              <br />
              With Confidence

            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">

              Complete your secure login using the
              one-time password sent to your mobile.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            {[
              "Secure Authentication",
              "OTP Verification",
              "Legal Due Diligence",
              "Risk Assessment",
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

        {/* Right Panel */}

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

              Enter the 6-digit OTP sent to

            </p>

            <p className="text-center font-semibold text-blue-700 mt-2">

              +91 {mobileNumber}

            </p>

            <form onSubmit={verifyOtp} className="mt-10">

              <label className="font-semibold">

                Enter OTP

              </label>

              <input
                type="text"
                placeholder="6 Digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                maxLength={6}
                className="w-full h-14 mt-3 rounded-xl border border-gray-300 px-5 text-center text-2xl tracking-[10px] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-8 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-lg font-semibold transition flex justify-center items-center gap-3"
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

            <div className="flex items-center my-8">

              <div className="flex-1 border-t"></div>

              <span className="mx-4 text-gray-400 text-sm uppercase">

                Secure Login

              </span>

              <div className="flex-1 border-t"></div>

            </div>

            <div className="bg-gray-50 rounded-2xl p-5 flex gap-4">

              <FaShieldAlt className="text-blue-600 text-3xl mt-1" />

              <div>

                <h3 className="font-bold">

                  Safe Authentication

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  Your OTP expires in 5 minutes.
                  Never share it with anyone.

                </p>

              </div>

            </div>

            <div className="text-center mt-8">

              <Link
                to="/mobile-login"
                className="text-blue-600 font-semibold hover:underline"
              >
                ← Back to Mobile Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}