import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "BUYER",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", user);

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      if (err.response?.status === 409) {
        alert("Username or Email already exists.");
      } else if (err.response?.status === 400) {
        alert("Invalid registration details.");
      } else {
        alert("Registration Failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">

      {/* LEFT PANEL */}

      <div className="w-[42%] bg-[#1F263B] text-white px-12 py-10 flex flex-col justify-between">

        <div>
          <h2 className="uppercase tracking-[4px] text-sm">
            DILIGENCE LEDGER
          </h2>
        </div>

        <div>

          <h1 className="font-serif text-[42px] leading-[50px]">

            Start your property due diligence journey today.

          </h1>

          <p className="mt-6 text-gray-300 leading-7 max-w-md">

            Create your account to securely verify ownership,
            legal records, tax history, LandRegistryResponse
            zoning information,
            permits and environmental risks in one place.

          </p>

        </div>

        <div className="text-gray-400 text-sm">
          © Diligence Ledger
        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="w-[58%] bg-[#F8F5ED] flex items-center justify-center">

        <div className="w-[400px]">

          <p className="text-[#C96B5B] text-sm mb-2">

            Create Your Account

          </p>

          <h1 className="font-serif text-[36px]">

            Register

          </h1>

          <p className="text-gray-500 mt-2 mb-4">

            Create your Due Diligence account

          </p>

          <form onSubmit={register}>

            {/* Username */}

            <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2">

              Username

            </label>

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full h-11 bg-[#EFE8D8] rounded-xl px-5 outline-none mb-4"
            />

            {/* Email */}

            <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2">

              Email Address

            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full h-11 bg-[#EFE8D8] rounded-xl px-5 outline-none mb-4"
            />

            {/* Password */}

            <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2">

              Password

            </label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full h-11 bg-[#EFE8D8] rounded-xl px-5 outline-none mb-4"
            />

            {/* Role */}

            <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2">

              Select Role

            </label>

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full h-11 bg-[#EFE8D8] rounded-xl px-5 outline-none mb-5"
            >
              <option value="BUYER">Buyer</option>
              <option value="AGENT">Agent</option>
              <option value="ADMIN">Admin</option>
              <option value="LEGAL_REVIEWER">Legal Reviewer</option>
              <option value="FINANCIAL_INSTITUTION">
                Financial Institution
              </option>
            </select>
                        <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#1F263B] hover:bg-slate-800 text-white uppercase tracking-[2px] transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>

          </form>

          <div className="text-center mt-4">

            <p className="text-gray-500">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 text-slate-900 font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;