import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import PropertyForm from "../../components/forms/PropertyForm";
import { FullPageLoader } from "../../components/ui/Loader";

export default function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    loadProperty();
  }, []);

  async function loadProperty() {
    try {
      const { data } = await api.get(`/properties/${id}`);

      setFormData({
        title: data.title || "",
        propertyType: data.propertyType || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        area: data.area || "",
        price: data.price || "",
        ownerName: data.ownerName || "",
        contactNumber: data.contactNumber || "",
        description: data.description || "",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to load property.");
      navigate("/properties");
    } finally {
      setLoading(false);
    }
  }

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
      newErrors.propertyType = "Property type is required";

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
      setSaving(true);

      await api.put(`/properties/${id}`, {
        ...formData,
        area: Number(formData.area),
        price: Number(formData.price),
      });

      navigate("/properties");
    } catch (err) {
      console.error(err);
      alert("Unable to update property.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <FullPageLoader title="Loading Property..." />
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Edit Property
        </h1>

        <p className="mt-2 text-slate-500">
          Update property information.
        </p>

      </div>

      <PropertyForm
        formData={formData}
        errors={errors}
        loading={saving}
        submitText="Update Property"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/properties")}
      />

    </div>
  );
}