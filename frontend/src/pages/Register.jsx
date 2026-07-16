import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag
} from "react-icons/fa";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "BUYER"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register", user);

      alert("Registration Successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="bg-slate-900 text-white p-12 flex flex-col justify-center">

          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mb-8">

            <FaBuilding size={38}/>

          </div>

          <h1 className="text-5xl font-bold">
            Real Estate
          </h1>

          <h2 className="text-blue-400 text-2xl mt-3">
            Due Diligence Platform
          </h2>

          <p className="mt-8 text-slate-300 leading-8">

            Register to securely access the Real Estate Due
            Diligence Platform for property verification,
            legal review and financial validation.

          </p>

        </div>

        {/* RIGHT PANEL */}

        <div className="p-12">

          <h2 className="text-4xl font-bold text-slate-800">

            Create Account

          </h2>

          <p className="text-slate-500 mt-2 mb-10">

            Register to continue

          </p>

          <form
            onSubmit={register}
            className="space-y-5"
          >

            <div className="flex items-center border border-slate-300 rounded-xl px-4">

              <FaUser className="text-slate-400"/>

              <input
                className="w-full p-4 outline-none"
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
              />

            </div>

            <div className="flex items-center border border-slate-300 rounded-xl px-4">

              <FaEnvelope className="text-slate-400"/>

              <input
                className="w-full p-4 outline-none"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />

            </div>

            <div className="flex items-center border border-slate-300 rounded-xl px-4">

              <FaLock className="text-slate-400"/>

              <input
                type="password"
                className="w-full p-4 outline-none"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />

            </div>

            <div className="flex items-center border border-slate-300 rounded-xl px-4">

              <FaUserTag className="text-slate-400"/>

              <select
                className="w-full p-4 outline-none bg-white"
                name="role"
                onChange={handleChange}
              >

                <option value="BUYER">Buyer</option>
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
                <option value="LEGAL_REVIEWER">Legal Reviewer</option>
                <option value="FINANCIAL_INSTITUTION">Financial Institution</option>

              </select>

            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold text-lg"
            >

              Create Account

            </button>

          </form>

          <div className="text-center mt-8">

            Already have an account?

            <Link
              to="/"
              className="text-blue-600 font-semibold ml-2"
            >

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;