import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import PropertyForm from "../../components/forms/PropertyForm";

export default function AddProperty() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    area: "",
    price: "",
    ownerName: "",
    contactNumber: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.title.trim())
      newErrors.title = "Property title is required";

    if (!formData.propertyType)
      newErrors.propertyType = "Select a property type";

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    if (!formData.city.trim())
      newErrors.city = "City is required";

    if (!formData.state.trim())
      newErrors.state = "State is required";

    if (!formData.area)
      newErrors.area = "Area is required";

    if (!formData.price)
      newErrors.price = "Price is required";

    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/properties", {
        ...formData,
        area: Number(formData.area),
        price: Number(formData.price),
      });

      navigate("/properties");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert("Failed to save property: " + err.response.data.message);
      } else if (err.response && err.response.data && err.response.data.error) {
        alert("Failed to save property: " + err.response.data.error);
      } else {
        alert("Failed to save property. Please check if all required fields are filled and the address is valid.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Add Property
        </h1>

        <p className="mt-1 text-slate-500">
          Register a new property for verification.
        </p>

      </div>

      <PropertyForm
        formData={formData}
        errors={errors}
        loading={loading}
        submitText="Add Property"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/properties")}
      />

    </div>
  );
}