import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("BUYER");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="min-h-screen flex">

    {/* LEFT PANEL */}

    <div className="w-[42%] bg-[#1F263B] text-white px-14 py-12 flex flex-col justify-between">

      <div>
        <h2 className="uppercase tracking-[4px] text-sm">
          DILIGENCE LEDGER
        </h2>
      </div>

      <div>

        <h1 className="font-serif text-[48px] leading-[56px]">

          Every property tells a story.Verify it before you sign.

        </h1>

        <p className="mt-10 text-gray-300 leading-8 max-w-md">

          One address. Ownership, tax history,
          zoning, flood risks, permits and
          environmental records.
          Consolidated, secured and explainable.

        </p>

      </div>

      <div className="text-gray-400 text-sm">

        © Diligence Ledger

      </div>

    </div>

    {/* RIGHT PANEL */}

    <div className="w-[58%] bg-[#F8F5ED] flex items-start pt-24 justify-center">

      <div className="w-[460px]">

        <p className="text-[#C96B5B] text-sm mb-2">

          Create Your Account

        </p>

        <h1 className="font-serif text-[42px]">

         Create Account

        </h1>

        <p className="text-gray-500 mt-2 mb-8">

         Create your due diligence account

        </p>

        <form onSubmit={login}>

          {/* ROLE BUTTONS */}

          <div className="flex flex-wrap gap-3 mb-8">

            {["BUYER","AGENT","ADMIN","LEGAL_REVIEWER",
              "FINANCIAL"].map((role)=>(
              <button
                key={role}
                type="button"
                onClick={()=>setSelectedRole(role)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition ${
  selectedRole === role
    ? "bg-[#1F263B] text-white"
    : "bg-[#E7E0D3] text-slate-700"
}`}
              >
                {role}
              </button>
            ))}

          </div>

          

          {/* EMAIL */}

          <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2">

            Email Address

          </label>

          <input

            type="email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            placeholder="Enter your email"

            required

            className="w-full h-14 bg-[#EFE8D8] rounded-xl px-5 outline-none mb-6"

          />

          {/* PASSWORD */}

          <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2">

            Password

          </label>

          <input

            type="password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            placeholder="Enter your password"

            required

            className="w-full h-14 bg-[#EFE8D8] rounded-xl px-5 outline-none mb-8"

          />

          <button

            type="submit"

            disabled={loading}

            className="w-full h-14 rounded-xl bg-[#1F263B] hover:bg-slate-800 text-white uppercase tracking-[2px] transition"

          >

            {loading ? "Signing In..." : "CREATE ACCOUNT"}

          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-gray-500">

            New to the platform?

            <Link

              to="/register"

              className="ml-2 text-slate-900 font-semibold hover:underline"

            >

              Create an account

            </Link>

          </p>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;