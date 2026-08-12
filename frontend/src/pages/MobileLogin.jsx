import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FaBuilding,
  FaMobileAlt,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

export default function MobileLogin() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/auth/mobile/send-otp`,
        {
          mobileNumber,
        }
      );

      toast.success("OTP sent successfully!");

      navigate("/verify-mobile-otp", {
        state: { mobileNumber },
      });
    } catch (error) {
      toast.error(
        error.response?.data || "Unable to send OTP."
      );
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

              Secure platform for property verification,
              ownership validation, fraud detection,
              legal due diligence and intelligent risk
              assessment.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            {[
              "Secure Authentication",
              "Property Verification",
              "Legal Due Diligence",
              "Risk Assessment",
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

        {/* Right Panel */}

        <div className="w-full lg:w-1/2 flex justify-center items-center px-10">

          <div className="w-full max-w-md">

            <div className="flex justify-center">

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

                <FaMobileAlt className="text-5xl text-blue-600" />

              </div>

            </div>

            <h1 className="text-center text-4xl font-bold mt-8">

              Mobile Login

            </h1>

            <p className="text-center text-gray-500 mt-4">

              Enter your registered mobile number
              to receive a one-time password (OTP).

            </p>

            <form onSubmit={sendOtp} className="mt-10">

              <label className="font-semibold">

                Mobile Number

              </label>

              <div className="flex mt-3">

                <div className="w-24 h-14 border rounded-l-xl bg-gray-50 flex items-center justify-center font-semibold">

                  +91

                </div>

                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  maxLength={10}
                  className="flex-1 h-14 border border-l-0 rounded-r-xl px-5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  required
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition text-white font-semibold text-lg flex justify-center items-center gap-3"
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

            <div className="flex items-center my-8">

              <div className="flex-1 border-t"></div>

              <span className="mx-4 text-gray-400 uppercase text-sm">

                Secure Login

              </span>

              <div className="flex-1 border-t"></div>

            </div>

            <div className="border rounded-2xl p-5 bg-gray-50 flex gap-4">

              <FaShieldAlt className="text-3xl text-blue-600 mt-1" />

              <div>

                <h3 className="font-bold">

                  Secure & Private

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  We never share your mobile number.
                  OTP is generated securely for authentication.

                </p>

              </div>

            </div>

            <div className="text-center mt-8">

              <p className="text-gray-500">

                Prefer Email Login?

              </p>

              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >

                Login with Email

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}