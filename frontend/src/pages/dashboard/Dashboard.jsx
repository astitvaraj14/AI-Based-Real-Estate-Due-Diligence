import { useEffect, useState } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

import api from "../../services/api";

import DashboardStats from "../../components/dashboard/DashboardStats";
import VerificationChart from "../../components/charts/VerificationChart";
import RecentProperties from "../../components/dashboard/RecentProperties";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import PropertyMap from "../../components/dashboard/PropertyMap";
import MarketTrendsWidget from "../../components/dashboard/MarketTrendsWidget";

import { FullPageLoader } from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/dashboard");

      setDashboard(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleDeleteProperty(id) {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/properties/${id}`);
        // Refresh dashboard
        loadDashboard(true);
      } catch (err) {
        console.error(err);
        alert("Failed to delete property.");
      }
    }
  }

  if (loading) {
    return (
      <FullPageLoader
        title="Loading Dashboard"
        subtitle="Fetching dashboard information..."
      />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="text-red-600" size={30} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-3 text-slate-500">
            {error}
          </p>

          <Button
            className="mt-8"
            leftIcon={<RefreshCw size={18} />}
            onClick={() => loadDashboard()}
          >
            Try Again
          </Button>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Monitor property verification, portfolio status and recent activity.
          </p>

        </div>

        <Button
          variant="outline"
          leftIcon={
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
          }
          onClick={() => loadDashboard(true)}
          disabled={refreshing}
        >
          Refresh
        </Button>

      </div>

      {/* KPI Cards */}

      <DashboardStats dashboard={dashboard} />

      {/* Verification Chart */}

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-6">
            <VerificationChart dashboard={dashboard} />
        </div>
        <div className="xl:col-span-6">
            <PropertyMap />
        </div>
      </div>

      {/* Bottom Grid */}

      <div className="grid gap-8 xl:grid-cols-12">

        <div className="xl:col-span-8 space-y-8">
          <MarketTrendsWidget />
          <RecentProperties
            properties={dashboard?.recentProperties ?? []}
            onDelete={handleDeleteProperty}
          />
        </div>

        <div className="xl:col-span-4">
          <ActivityTimeline />
        </div>

      </div>

    </div>
  );
}