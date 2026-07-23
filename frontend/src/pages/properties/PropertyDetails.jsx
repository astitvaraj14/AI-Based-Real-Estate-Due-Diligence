import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  BadgeCheck,
  Clock3,
  XCircle,
  MapPin,
  User,
  Building2,
  IndianRupee,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import Button from "../../components/ui/Button";
import SectionCard from "../../components/cards/SectionCard";
import { FullPageLoader } from "../../components/ui/Loader";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, []);

  async function loadProperty() {
    try {
      const { data } = await api.get(`/properties/${id}`);
      setProperty(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <FullPageLoader title="Loading Property..." />
    );
  }

  const statusIcon = () => {
    switch (property.verificationStatus) {
      case "VERIFIED":
        return <BadgeCheck className="text-emerald-600" />;

      case "PENDING":
        return <Clock3 className="text-amber-600" />;

      default:
        return <XCircle className="text-red-600" />;
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button
          leftIcon={<Pencil size={18} />}
          onClick={() =>
            navigate(`/properties/edit/${id}`)
          }
        >
          Edit Property
        </Button>

      </div>

      <SectionCard>

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {property.title}
            </h1>

            <p className="mt-2 text-slate-500">
              {property.address}
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

            {statusIcon()}

            <span className="font-medium">
              {property.verificationStatus}
            </span>

          </div>

        </div>

      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">

        <SectionCard
          title="Owner Information"
        >

          <div className="space-y-5">

            <Info
              icon={<User size={18} />}
              label="Owner"
              value={property.ownerName}
            />

            <Info
              icon={<MapPin size={18} />}
              label="City"
              value={property.city}
            />

            <Info
              icon={<Building2 size={18} />}
              label="State"
              value={property.state}
            />

          </div>

        </SectionCard>

        <SectionCard
          title="Verification Summary"
        >

          <div className="space-y-5">

            <Info
              label="Verification Score"
              value={`${property.verificationScore}%`}
            />

            <Info
              label="Registered"
              value={new Date(
                property.registrationDate
              ).toLocaleDateString()}
            />

            <Info
              label="Verified"
              value={
                property.verificationDate
                  ? new Date(
                      property.verificationDate
                    ).toLocaleDateString()
                  : "-"
              }
            />

          </div>

        </SectionCard>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <SectionCard
          title="Property Type"
        >
          <p className="text-2xl font-bold">
            {property.propertyType}
          </p>
        </SectionCard>

        <SectionCard
          title="Area"
        >
          <p className="text-2xl font-bold">
            {property.area} sq.ft
          </p>
        </SectionCard>

        <SectionCard
          title="Market Value"
        >
          <div className="flex items-center gap-2">

            <IndianRupee size={24} />

            <span className="text-2xl font-bold">
              {property.price}
            </span>

          </div>

        </SectionCard>

      </div>

      <SectionCard title="Description">

        <p className="leading-7 text-slate-600">
          {property.description ||
            "No description available."}
        </p>

      </SectionCard>

    </div>
  );
}

function Info({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4">

      {icon && (
        <div className="rounded-lg bg-slate-100 p-2">
          {icon}
        </div>
      )}

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-900">
          {value}
        </p>

      </div>

    </div>
  );
}