import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import {
  FaHome,
  FaMapMarkerAlt,
  FaUserShield,
  FaPlusCircle,
  FaArrowRight,
} from "react-icons/fa";

function Dashboard() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const [propertyCount, setPropertyCount] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.get("/properties");

      setProperties(response.data);
      setPropertyCount(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          {/* Welcome */}

          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

            <h1 className="text-4xl font-bold text-slate-800">
              Welcome 👋
            </h1>

            <p className="text-slate-500 mt-2">
              {email}
            </p>

            <p className="text-slate-400 mt-3">
              Manage properties, validate addresses and perform due diligence
              operations from one dashboard.
            </p>

          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

              <FaHome
                className="text-blue-600"
                size={45}
              />

              <h2 className="text-3xl font-bold mt-5">
                {propertyCount}
              </h2>

              <p className="text-slate-500">
                Total Properties
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

              <FaMapMarkerAlt
                className="text-emerald-600"
                size={45}
              />

              <h2 className="text-3xl font-bold mt-5">
                On Demand
              </h2>

              <p className="text-slate-500">
                Address Validation
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

              <FaUserShield
                className="text-orange-500"
                size={45}
              />

              <h2 className="text-2xl font-bold mt-5">
                {role}
              </h2>

              <p className="text-slate-500">
                Current Role
              </p>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <Link
                to="/properties"
                className="bg-white rounded-2xl shadow-md p-6 hover:bg-blue-600 hover:text-white transition"
              >

                <FaHome size={35} />

                <h3 className="text-xl font-semibold mt-5">
                  View Properties
                </h3>

                <div className="flex justify-end mt-5">
                  <FaArrowRight />
                </div>

              </Link>

              <Link
                to="/add-property"
                className="bg-white rounded-2xl shadow-md p-6 hover:bg-emerald-600 hover:text-white transition"
              >

                <FaPlusCircle size={35} />

                <h3 className="text-xl font-semibold mt-5">
                  Add Property
                </h3>

                <div className="flex justify-end mt-5">
                  <FaArrowRight />
                </div>

              </Link>

              <Link
                to="/address"
                className="bg-white rounded-2xl shadow-md p-6 hover:bg-orange-500 hover:text-white transition"
              >

                <FaMapMarkerAlt size={35} />

                <h3 className="text-xl font-semibold mt-5">
                  Validate Address
                </h3>

                <div className="flex justify-end mt-5">
                  <FaArrowRight />
                </div>

              </Link>

            </div>

          </div>

        

          {/* Recent Properties */}

          <div className="mt-10 bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                Recent Properties
              </h2>

              <Link
                to="/properties"
                className="text-blue-600 font-semibold hover:underline"
              >
                View All
              </Link>

            </div>

            {properties.length === 0 ? (

              <div className="text-center py-10 text-slate-500">
                No properties available.
              </div>

            ) : (

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">City</th>
                    <th className="text-left p-3">Owner</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Price</th>

                  </tr>

                </thead>

                <tbody>

                  {properties.slice(0, 5).map((property) => (

                    <tr
                      key={property.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-3">
                        {property.title}
                      </td>

                      <td className="p-3">
                        {property.city}
                      </td>

                      <td className="p-3">
                        {property.ownerName}
                      </td>

                      <td className="p-3">
                        {property.propertyType}
                      </td>

                      <td className="p-3 font-semibold text-blue-600">
                        ₹ {Number(property.price).toLocaleString("en-IN")}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;