import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
} from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      toast.success("Registration successful!");

      navigate("/login");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <FaBuilding size={28} />
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Register to access the Real Estate Due
            Diligence Platform.
          </p>

        </div>

        <form
          onSubmit={register}
          className="mt-8 space-y-5"
        >

          {/* Full Name */}

          <div>

            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border px-4">

              <FaUser className="mr-3 text-gray-500" />

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full py-4 outline-none"
                required
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <div className="flex items-center rounded-xl border px-4">

              <FaEnvelope className="mr-3 text-gray-500" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full py-4 outline-none"
                required
              />

            </div>

          </div>

          {/* Role */}

          <div>

            <label className="mb-2 block font-medium">
              Register As
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl border p-4 outline-none"
            >
              <option value="BUYER">Buyer</option>
              <option value="AGENT">Agent</option>
              <option value="LEGAL_REVIEWER">
                Legal Reviewer
              </option>
              <option value="FINANCIAL_INSTITUTION">
                Financial Institution
              </option>
            </select>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>

            <div className="flex items-center rounded-xl border px-4">

              <FaLock className="mr-3 text-gray-500" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full py-4 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border px-4">

              <FaLock className="mr-3 text-gray-500" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full py-4 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-slate-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}