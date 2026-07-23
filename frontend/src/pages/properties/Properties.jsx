import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import Button from "../../components/ui/Button";
import PropertyTable from "../../components/tables/PropertyTable";
import StatCard from "../../components/cards/StatCard";
import SectionCard from "../../components/cards/SectionCard";

export default function Properties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const { data } = await api.get("/properties");
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        property.city
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        property.ownerName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        property.verificationStatus?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [properties, search, statusFilter]);

  const verified = properties.filter(
    (p) => p.verificationStatus === "VERIFIED"
  ).length;

  const pending = properties.filter(
    (p) => p.verificationStatus === "PENDING"
  ).length;

  const rejected = properties.filter(
    (p) => p.verificationStatus === "REJECTED"
  ).length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Properties
          </h1>
          <p className="text-slate-500">
            Manage your real estate portfolio.
          </p>
        </div>

        <Button
          leftIcon={<Plus size={18} />}
          onClick={() => navigate("/add-property")}
        >
          Add Property
        </Button>
      </div>

      <SectionCard>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard title="Total" value={properties.length} />
        <StatCard title="Verified" value={verified} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Rejected" value={rejected} />
      </div>

      <PropertyTable properties={filteredProperties} />
    </div>
  );
}