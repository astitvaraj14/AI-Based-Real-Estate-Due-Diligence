import { useEffect, useMemo, useState } from "react";
import { Search, Building2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

import api from "../../services/api";

import Button from "../../components/ui/Button";
import PropertyTable from "../../components/tables/PropertyTable";
import StatCard from "../../components/cards/StatCard";
import SectionCard from "../../components/cards/SectionCard";

export default function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
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

  async function handleDeleteProperty(id) {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/properties/${id}`);
        loadProperties();
      } catch (err) {
        console.error(err);
        alert("Failed to delete property.");
      }
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
    (p) => p.verificationStatus?.toLowerCase() === "verified"
  ).length;

  const pending = properties.filter(
    (p) => !p.verificationStatus || p.verificationStatus.toLowerCase() === "pending"
  ).length;

  const rejected = properties.filter(
    (p) => p.verificationStatus?.toLowerCase() === "rejected"
  ).length;

  if (loading) {
    return <div>Loading...</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Properties
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your real estate portfolio.
          </p>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <SectionCard>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </SectionCard>
      </motion.div>

      <motion.div variants={item} className="grid gap-6 md:grid-cols-4">
        <StatCard title="Total" value={properties.length} icon={Building2} color="blue" />
        <StatCard title="Verified" value={verified} icon={CheckCircle2} color="emerald" />
        <StatCard title="Pending" value={pending} icon={Clock} color="amber" />
        <StatCard title="Rejected" value={rejected} icon={XCircle} color="rose" />
      </motion.div>

      <motion.div variants={item}>
        <PropertyTable 
          properties={filteredProperties} 
          onDelete={handleDeleteProperty} 
        />
      </motion.div>
    </motion.div>
  );
}