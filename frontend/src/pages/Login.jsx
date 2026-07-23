import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaMobileAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState(
    localStorage.getItem("rememberEmail") || ""
  );

  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem("rememberEmail")
  );

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      authLogin(data.token, {
        email: data.email,
        role: data.role,
      });

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center overflow-hidden p-6">

      <div className="w-full max-w-7xl h-[94vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex">

        {/* ================= LEFT PANEL ================= */}

        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white flex-col justify-between p-14">

          <div>

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">

                <FaBuilding className="text-3xl" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Real Estate AI
                </h1>

                <p className="text-blue-200 mt-1">
                  Due Diligence Platform
                </p>

              </div>

            </div>

            <h2 className="text-5xl font-bold leading-tight mt-20">

              Verify Properties
              <br />
              With Confidence.

            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">

              Secure platform for property verification,
              ownership validation, legal due diligence,
              fraud detection and intelligent risk analysis.

            </p>

          </div>

          <div className="space-y-5">

            {[
              "Secure Authentication",
              "Property Verification",
              "Legal Due Diligence",
              "Risk Assessment",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/10 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-md"
              >

                <FaCheckCircle className="text-green-300 text-xl" />

                <span className="text-lg">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="w-full lg:w-1/2 flex justify-center items-center px-10 bg-white">

          <div className="w-full max-w-md">

            <h1 className="text-4xl font-bold text-slate-800">

              Welcome Back 👋

            </h1>

            <p className="text-gray-500 mt-3">

              Sign in to continue managing your properties.

            </p>

            <form
              onSubmit={login}
              className="mt-8 space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label className="font-semibold text-gray-700 block mb-2">

                  Email Address

                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="font-semibold text-gray-700 block mb-2">

                  Password

                </label>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="w-full h-14 rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
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

              </div>
                            {/* Remember Me & Forgot Password */}

                            <div className="flex items-center justify-between">

<label className="flex items-center gap-2 text-gray-600 cursor-pointer">

  <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) =>
      setRememberMe(e.target.checked)
    }
    className="w-4 h-4 accent-blue-600"
  />

  <span>Remember Me</span>

</label>

<button
  type="button"
  onClick={() =>
    navigate("/forgot-password")
  }
  className="text-blue-600 hover:text-blue-700 font-semibold transition"
>
  Forgot Password?
</button>

</div>

{/* Login Button */}

<button
type="submit"
disabled={loading}
className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg flex justify-center items-center gap-3 transition-all duration-300 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
>

{loading ? (
  "Signing In..."
) : (
  <>
    Sign In
    <FaArrowRight />
  </>
)}

</button>

{/* Divider */}

<div className="flex items-center my-6">

<div className="flex-1 border-t border-gray-300"></div>

<span className="mx-4 text-gray-400 text-sm uppercase tracking-wider">

  OR

</span>

<div className="flex-1 border-t border-gray-300"></div>

</div>

{/* Google Login */}

<div className="flex justify-center">

<GoogleLogin
  onSuccess={async (credentialResponse) => {

    try {

      const res = await api.post(
        "/auth/google",
        {
          token:
            credentialResponse.credential,
        }
      );

      if (
        res.data.roleSelectionRequired
      ) {

        navigate("/select-role", {
          state: {
            email:
              res.data.email,
          },
        });

        return;
      }

      authLogin(res.data.token, {
        email: res.data.email,
        role: res.data.role,
      });

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data
          ?.message ||
          "Google Login Failed"
      );

    }

  }}

  onError={() =>
    toast.error(
      "Google Login Failed"
    )
  }

/>

</div>

{/* Divider */}

<div className="flex items-center my-6">

<div className="flex-1 border-t border-gray-300"></div>

<span className="mx-4 text-gray-400 text-sm uppercase tracking-wider">

  OR

</span>

<div className="flex-1 border-t border-gray-300"></div>

</div>

{/* Mobile Login */}

<button
type="button"
onClick={() =>
  navigate("/mobile-login")
}
className="w-full h-14 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex justify-center items-center gap-3 font-semibold text-lg"
>

<FaMobileAlt />

Continue with Mobile Number

</button>
              {/* Register */}

              <div className="pt-6 text-center border-t border-gray-200">

                <p className="text-gray-600">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition"
                >
                  Create Account
                </Link>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;