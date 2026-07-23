import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaBuilding,
  FaBalanceScale,
  FaUniversity,
} from "react-icons/fa";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function SelectRole() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  const email = location.state?.email;

  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/login");
    return null;
  }

  const roles = [
    {
      value: "BUYER",
      title: "Buyer",
      icon: <FaUser size={26} />,
      description: "Purchase and verify property documents.",
    },
    {
      value: "AGENT",
      title: "Agent",
      icon: <FaBuilding size={26} />,
      description: "Manage and list properties for clients.",
    },
    {
      value: "LEGAL_REVIEWER",
      title: "Legal Reviewer",
      icon: <FaBalanceScale size={26} />,
      description: "Review legal documents and ownership.",
    },
    {
      value: "FINANCIAL_INSTITUTION",
      title: "Financial Institution",
      icon: <FaUniversity size={26} />,
      description: "Verify loans and financial approvals.",
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/select-role", {
        email,
        role: selectedRole,
      });

      authLogin(data.token, {
        email: data.email,
        role: data.role,
      });

      toast.success("Role selected successfully!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to save role"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          Choose Your Role
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Welcome <strong>{email}</strong>
        </p>

        <p className="text-center text-gray-500 mb-10">
          Select your role to continue.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {roles.map((role) => (

            <div
              key={role.value}
              onClick={() => setSelectedRole(role.value)}
              className={`cursor-pointer rounded-2xl border-2 p-6 transition duration-300 hover:shadow-lg ${
                selectedRole === role.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >

              <div className="text-blue-600 mb-4">
                {role.icon}
              </div>

              <h2 className="text-xl font-bold">
                {role.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {role.description}
              </p>

            </div>

          ))}

        </div>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Continue"}
        </button>

      </div>
    </div>
  );
}

export default SelectRole;