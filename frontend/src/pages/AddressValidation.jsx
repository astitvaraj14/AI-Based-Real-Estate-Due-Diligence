import { useState } from "react";
import api from "../services/api";

function AddressValidation() {

    const [address, setAddress] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateAddress = async () => {

        if (!address.trim()) {
            alert("Please enter an address.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.get("/address/validate", {
                params: {
                    address
                }
            });

            setResult(response.data);

        } catch (err) {

            console.error(err);

            alert("Unable to validate address.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            {/* ===========================
                PAGE HEADER
            =========================== */}

            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl text-white p-8 shadow-lg">

                <h1 className="text-4xl font-bold">

                    Address Validation

                </h1>

                <p className="mt-3 text-blue-100">

                    Verify property addresses before adding them to the system.

                </p>

            </div>

            {/* ===========================
                VALIDATION CARD
            =========================== */}

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 max-w-4xl">

                <label className="block text-lg font-semibold mb-3 text-slate-900 dark:text-white">

                    Property Address

                </label>

                <textarea
                    rows="4"
                    className="w-full border dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter complete property address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button
                    onClick={validateAddress}
                    disabled={loading}
                    className={`mt-6 px-8 py-3 rounded-lg text-white font-semibold transition ${
                        loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-800 hover:bg-blue-900"
                    }`}
                >
                    {loading ? "Validating..." : "Validate Address"}
                </button>

                {/* ===========================
                    RESULT
                =========================== */}

                {result && (

                    <div
                        className={`mt-8 rounded-xl border p-6 ${
                            result.valid
                                ? "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-800"
                                : "bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-800"
                        }`}
                    >

                        <h2
                            className={`text-2xl font-bold ${
                                result.valid
                                    ? "text-green-700 dark:text-green-400"
                                    : "text-red-700 dark:text-red-400"
                            }`}
                        >

                            {result.valid
                                ? "✅ Address Verified"
                                : "❌ Address Validation Failed"}

                        </h2>

                        <p className="mt-4 text-gray-700 dark:text-gray-300">

                            {result.message}

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default AddressValidation;