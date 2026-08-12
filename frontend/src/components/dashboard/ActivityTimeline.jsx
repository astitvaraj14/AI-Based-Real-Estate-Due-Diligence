import React, { useEffect, useState } from "react";
import { Activity, Clock } from "lucide-react";
import SectionCard from "../cards/SectionCard";
import api from "../../services/api";

export default function ActivityTimeline() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const { data } = await api.get("/audit-logs");
        setLogs(data.slice(0, 8)); // Show only latest 8
      } catch (error) {
        console.error("Failed to load audit logs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-slate-500">Loading Activity...</div>;
  }

  return (
    <SectionCard title={
      <div className="flex items-center gap-2">
        <Activity size={20} className="text-purple-600" />
        Activity Timeline
      </div>
    }>
      {logs.length === 0 ? (
        <div className="p-4 text-center text-slate-500">No recent activity.</div>
      ) : (
        <div className="relative border-l border-slate-200 ml-3 space-y-6">
          {logs.map((log) => (
            <div key={log.id} className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 flex h-3 w-3 rounded-full bg-purple-500 ring-4 ring-white dark:ring-slate-900" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {log.action.replace(/_/g, ' ')}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {log.description}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                  <Clock size={12} />
                  {new Date(log.actionTime).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
