import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddressValidation() {

    const [address, setAddress] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateAddress = async () => {

        if (!address.trim()) {
            alert("Please enter an address");
            return;
        }

        try {

            setLoading(true);

            const response = await api.get("/address/validate", {
                params: {
                    address: address
                }
            });

            setResult(response.data);

        } catch (err) {

            console.log(err);

            alert("Unable to validate address");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-10">

                    <h1 className="text-3xl font-bold mb-8">
                        Address Validation
                    </h1>

                    <div className="bg-white rounded-xl shadow p-8 max-w-2xl">

                        <input
                            className="border p-3 rounded w-full mb-5"
                            placeholder="Enter Property Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button
                            onClick={validateAddress}
                            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800"
                        >
                            {loading ? "Validating..." : "Validate Address"}
                        </button>

                        {result && (

                            <div
                                className={`mt-8 p-5 rounded-lg ${
                                    result.valid
                                        ? "bg-green-100 border border-green-500"
                                        : "bg-red-100 border border-red-500"
                                }`}
                            >

                                <h2 className="text-xl font-bold mb-2">

                                    {result.valid
                                        ? "✅ Address Valid"
                                        : "❌ Address Invalid"}

                                </h2>

                                <p>{result.message}</p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddressValidation;