import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Properties() {

    const [properties, setProperties] = useState([]);

    const [city, setCity] = useState("");
    const [type, setType] = useState("");

    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    useEffect(() => {
        loadAllProperties();
    }, []);

    const loadAllProperties = async () => {
        const response = await api.get("/properties");
        setProperties(response.data);
    };

    const searchByCity = async () => {

        if (!city) {
            loadAllProperties();
            return;
        }

        const response = await api.get(`/properties/city/${city}`);

        setProperties(response.data);

    };

    const searchByType = async () => {

        if (!type) {
            loadAllProperties();
            return;
        }

        const response = await api.get(`/properties/type/${type}`);

        setProperties(response.data);

    };

    const searchByPrice = async () => {

        if (!min || !max) {
            loadAllProperties();
            return;
        }

        const response = await api.get("/properties/price", {

            params: {
                min,
                max
            }

        });

        setProperties(response.data);

    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-10">

                    <h1 className="text-3xl font-bold mb-6">
                        Properties
                    </h1>

                    <div className="bg-white rounded-xl shadow p-5 mb-8">

                        <div className="grid grid-cols-3 gap-4">

                            <div>

                                <input
                                    className="border p-3 rounded w-full"
                                    placeholder="Search by City"
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
                                />

                                <button
                                    onClick={searchByCity}
                                    className="mt-2 bg-green-700 text-white px-4 py-2 rounded w-full"
                                >
                                    Search City
                                </button>

                            </div>

                            <div>

                                <input
                                    className="border p-3 rounded w-full"
                                    placeholder="Search by Type"
                                    value={type}
                                    onChange={(e)=>setType(e.target.value)}
                                />

                                <button
                                    onClick={searchByType}
                                    className="mt-2 bg-blue-700 text-white px-4 py-2 rounded w-full"
                                >
                                    Search Type
                                </button>

                            </div>

                            <div>

                                <input
                                    className="border p-3 rounded w-full mb-2"
                                    placeholder="Minimum Price"
                                    value={min}
                                    onChange={(e)=>setMin(e.target.value)}
                                />

                                <input
                                    className="border p-3 rounded w-full"
                                    placeholder="Maximum Price"
                                    value={max}
                                    onChange={(e)=>setMax(e.target.value)}
                                />

                                <button
                                    onClick={searchByPrice}
                                    className="mt-2 bg-red-700 text-white px-4 py-2 rounded w-full"
                                >
                                    Search Price
                                </button>

                            </div>

                        </div>

                    </div>

                    <table className="w-full bg-white rounded shadow">

                        <thead>

                            <tr className="bg-green-700 text-white">

                                <th className="p-3">Title</th>
                                <th className="p-3">City</th>
                                <th className="p-3">State</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Owner</th>
                                <th className="p-3">Price</th>

                            </tr>

                        </thead>

                        <tbody>

                            {properties.map((property)=>(
                                <tr
                                    key={property.id}
                                    className="border-b text-center"
                                >

                                    <td className="p-3">{property.title}</td>
                                    <td className="p-3">{property.city}</td>
                                    <td className="p-3">{property.state}</td>
                                    <td className="p-3">{property.propertyType}</td>
                                    <td className="p-3">{property.ownerName}</td>
                                    <td className="p-3">₹ {property.price}</td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Properties;