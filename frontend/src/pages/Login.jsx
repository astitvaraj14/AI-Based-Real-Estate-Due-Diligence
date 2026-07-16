import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBuilding, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="bg-slate-900 text-white p-12 flex flex-col justify-center">

          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mb-8">
            <FaBuilding size={38} />
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Real Estate
          </h1>

          <h2 className="text-2xl text-blue-400 font-semibold mt-3">
            Due Diligence Platform
          </h2>

          <p className="mt-8 text-slate-300 leading-8 text-lg">
            A secure enterprise platform for property verification,
            legal due diligence, ownership validation, and risk
            assessment.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-emerald-400 text-xl" />
              <span>Secure JWT Authentication</span>
            </div>

            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-emerald-400 text-xl" />
              <span>Property Verification</span>
            </div>

            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-emerald-400 text-xl" />
              <span>Legal & Financial Review</span>
            </div>

            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-emerald-400 text-xl" />
              <span>Fraud Detection Support</span>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="p-12 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-2 mb-10">
            Sign in to access your dashboard.
          </p>

          <form onSubmit={login} className="space-y-6">

            <div>

              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="mt-2 flex items-center border border-slate-300 rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-500">

                <FaEnvelope className="text-slate-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 outline-none rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>

            <div>

              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="mt-2 flex items-center border border-slate-300 rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-500">

                <FaLock className="text-slate-400" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-4 outline-none rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              Login
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-slate-600">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;