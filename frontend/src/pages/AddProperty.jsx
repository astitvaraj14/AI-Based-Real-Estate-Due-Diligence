import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddProperty() {

    const navigate = useNavigate();

    const [property, setProperty] = useState({
        title: "",
        address: "",
        city: "",
        state: "",
        propertyType: "",
        price: "",
        area: "",
        ownerName: ""
    });

    const handleChange = (e) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value
        });
    };

    const saveProperty = async (e) => {

        e.preventDefault();

        try {

            await api.post("/properties", property);

            alert("Property Added Successfully");

            navigate("/properties");

        } catch (err) {

            console.log(err);

            alert("Unable to Add Property");

        }

    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-10">

                    <h1 className="text-3xl font-bold mb-8">
                        Add Property
                    </h1>

                    <form
                        onSubmit={saveProperty}
                        className="bg-white p-8 rounded-xl shadow grid grid-cols-2 gap-5"
                    >

                        <input
                            className="border p-3 rounded"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                        />

                        <input
                            className="border p-3 rounded"
                            placeholder="Owner Name"
                            name="ownerName"
                            onChange={handleChange}
                        />

                        <input
                            className="border p-3 rounded"
                            placeholder="Address"
                            name="address"
                            onChange={handleChange}
                        />

                        <input
                            className="border p-3 rounded"
                            placeholder="City"
                            name="city"
                            onChange={handleChange}
                        />

                        <input
                            className="border p-3 rounded"
                            placeholder="State"
                            name="state"
                            onChange={handleChange}
                        />

                        <input
                            className="border p-3 rounded"
                            placeholder="Property Type"
                            name="propertyType"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="border p-3 rounded"
                            placeholder="Price"
                            name="price"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="border p-3 rounded"
                            placeholder="Area (sq.ft)"
                            name="area"
                            onChange={handleChange}
                        />

                        <button
                            className="bg-green-700 text-white p-3 rounded col-span-2 hover:bg-green-800"
                        >
                            Save Property
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddProperty;