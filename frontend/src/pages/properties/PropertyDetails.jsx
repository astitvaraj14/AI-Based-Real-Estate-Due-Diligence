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

import { useAuth } from "../../context/AuthContext";

import api from "../../services/api";

import Button from "../../components/ui/Button";
import SectionCard from "../../components/cards/SectionCard";
import { FullPageLoader } from "../../components/ui/Loader";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const isAdmin = user?.role?.includes("ADMIN");

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

  async function handleUpdateStatus(status, score) {
    if (!window.confirm(`Are you sure you want to mark this property as ${status}?`)) return;
    try {
      await api.put(`/properties/${id}/status`, { status, score });
      loadProperty();
    } catch (err) {
      alert("Failed to update property status");
    }
  }

  if (loading) {
    return (
      <FullPageLoader title="Loading Property..." />
    );
  }

  const statusIcon = () => {
    switch ((property.verificationStatus || "").toUpperCase()) {
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

        <div className="flex items-center gap-3">
          {isAdmin && (
            <>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                onClick={() => handleUpdateStatus("Rejected", 0)}
              >
                Reject
              </Button>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 border-none"
                onClick={() => handleUpdateStatus("Verified", 100)}
              >
                Verify
              </Button>
            </>
          )}

          <Button
            leftIcon={<Pencil size={18} />}
            onClick={() =>
              navigate(`/properties/edit/${id}`)
            }
          >
            Edit
          </Button>
        </div>

      </div>

      <SectionCard>

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {property.title}
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {property.address}
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2">

            {statusIcon()}

            <span className="font-medium text-slate-900 dark:text-white">
              {property.verificationStatus || "Pending"}
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
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {property.propertyType}
          </p>
        </SectionCard>

        <SectionCard
          title="Area"
        >
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {property.area} sq.ft
          </p>
        </SectionCard>

        <SectionCard
          title="Market Value"
        >
          <div className="flex items-center gap-2">

            <IndianRupee size={24} />

            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {property.price}
            </span>

          </div>

        </SectionCard>

      </div>

      <SectionCard title="Description">

        <p className="leading-7 text-slate-600 dark:text-slate-300">
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
        <div className="rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-300 text-slate-600 p-2">
          {icon}
        </div>
      )}

      <div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="font-semibold text-slate-900 dark:text-white">
          {value != null ? value : "N/A"}
        </p>

      </div>

    </div>
  );
}