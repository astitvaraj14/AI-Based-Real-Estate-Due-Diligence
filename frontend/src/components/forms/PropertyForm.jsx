import { ArrowLeft, Save } from "lucide-react";

import Button from "../ui/Button";
import SectionCard from "../cards/SectionCard";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";

export default function PropertyForm({
  formData,
  errors = {},
  loading = false,
  submitText = "Save Property",
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">

      {/* Property Information */}

      <SectionCard
        title="Property Information"
        subtitle="Basic information about the property"
      >

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Property Title"
            name="title"
            value={formData.title}
            error={errors.title}
            onChange={onChange}
            placeholder="Enter property title"
          />

          <FormSelect
            label="Property Type"
            name="propertyType"
            value={formData.propertyType}
            error={errors.propertyType}
            onChange={onChange}
          >
            <option value="">Select Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Land">Land</option>
          </FormSelect>

          <FormInput
            label="City"
            name="city"
            value={formData.city}
            error={errors.city}
            onChange={onChange}
          />

          <FormInput
            label="State"
            name="state"
            value={formData.state}
            error={errors.state}
            onChange={onChange}
          />

          <FormInput
            className="md:col-span-2"
            label="Address"
            name="address"
            value={formData.address}
            error={errors.address}
            onChange={onChange}
            placeholder="Enter complete address"
          />

        </div>

      </SectionCard>

      {/* Property Details */}

      <SectionCard
        title="Property Details"
        subtitle="Area and pricing information"
      >

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Area (sq.ft)"
            type="number"
            name="area"
            value={formData.area}
            error={errors.area}
            onChange={onChange}
          />

          <FormInput
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            error={errors.price}
            onChange={onChange}
          />

        </div>

      </SectionCard>

      {/* Owner */}

      <SectionCard
        title="Owner Information"
      >

        <div className="grid gap-6 md:grid-cols-2">

          <FormInput
            label="Owner Name"
            name="ownerName"
            value={formData.ownerName}
            error={errors.ownerName}
            onChange={onChange}
          />

          <FormInput
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber || ""}
            error={errors.contactNumber}
            onChange={onChange}
          />

        </div>

      </SectionCard>

      {/* Description */}

      <SectionCard
        title="Description"
      >

        <FormTextarea
          label="Description"
          name="description"
          value={formData.description}
          error={errors.description}
          onChange={onChange}
          placeholder="Describe the property..."
        />

      </SectionCard>

      {/* Footer */}

      <div className="flex justify-end gap-4">

        <Button
          type="button"
          variant="outline"
          leftIcon={<ArrowLeft size={18} />}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          leftIcon={<Save size={18} />}
          disabled={loading}
        >
          {loading ? "Saving..." : submitText}
        </Button>

      </div>

    </form>
  );
}