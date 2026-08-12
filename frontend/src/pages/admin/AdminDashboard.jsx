import { useEffect, useState } from "react";
import { Users, Building2, CheckCircle2, IndianRupee, ShieldCheck, Activity, Settings2, Power, Ban } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../services/api";
import StatCard from "../../components/cards/StatCard";
import SectionCard from "../../components/cards/SectionCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    verifiedProperties: 0,
    pendingProperties: 0,
    totalValue: 0
  });
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [settings, setSettings] = useState({
    maintenanceMode: false,
    registrationsEnabled: true
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  async function fetchAdminData() {
    try {
      setLoading(true);
      const [statsRes, usersRes, logsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/audit-logs")
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setAuditLogs(logsRes.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load admin data. Ensure you have admin privileges.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(userId, newRole) {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert("Failed to update user role");
    }
  }

  async function handleStatusChange(userId, currentStatus) {
    const newStatus = !currentStatus;
    const action = newStatus ? "activate" : "suspend";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;
    
    try {
      await api.put(`/admin/users/${userId}/status`, { isActive: newStatus });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, active: newStatus } : u));
    } catch (err) {
      alert(`Failed to ${action} user`);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-slate-500 dark:text-slate-400">Loading comprehensive admin data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
        {error}
      </div>
    );
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
      className="space-y-8 pb-12"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Administration</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Global platform overview, user moderation, and live activity.
        </p>
      </motion.div>

      {/* Global Statistics */}
      <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="blue" />
        <StatCard title="Total Properties" value={stats.totalProperties} icon={Building2} color="amber" />
        <StatCard title="Verified Properties" value={stats.verifiedProperties} icon={CheckCircle2} color="emerald" />
        <StatCard title="Platform Value" value={`₹${(stats.totalValue / 1000000).toFixed(2)}M`} icon={IndianRupee} color="rose" />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <motion.div variants={item} className="lg:col-span-2 space-y-8">
          
          {/* User Management Table */}
          <SectionCard title="User Management" subtitle="Manage registered accounts, roles, and access status">
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
                <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((u) => (
                    <tr key={u.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!u.active ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${u.active ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'}`}>
                            {u.fullName?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          {u.fullName || "Unnamed"}
                        </div>
                      </td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.active ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {u.active ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 cursor-pointer"
                        >
                          <option value="ROLE_BUYER">Buyer</option>
                          <option value="ROLE_AGENT">Agent</option>
                          <option value="ROLE_ADMIN">Admin</option>
                          <option value="ROLE_LEGAL_REVIEWER">Legal Reviewer</option>
                          <option value="ROLE_FINANCIAL_INSTITUTION">Bank</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleStatusChange(u.id, u.active)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${u.active ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40'}`}
                        >
                          {u.active ? <><Ban size={14} /> Suspend</> : <><Power size={14} /> Activate</>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

        </motion.div>

        {/* Sidebar Content Area */}
        <motion.div variants={item} className="space-y-8">
          
          {/* Live Activity Feed */}
          <SectionCard title="Live Platform Activity" subtitle="Global audit log stream">
            <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {auditLogs.length > 0 ? (
                auditLogs.map((log) => (
                  <div key={log.id} className="flex gap-4 relative">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      <Activity size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {log.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {log.details}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {new Date(log.actionTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
              )}
            </div>
          </SectionCard>

          {/* System Settings */}
          <SectionCard title="Platform Settings" subtitle="Global configuration toggles">
            <div className="mt-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Maintenance Mode</h4>
                  <p className="text-xs text-slate-500">Disable all non-admin access</p>
                </div>
                <button 
                  onClick={() => setSettings(s => ({...s, maintenanceMode: !s.maintenanceMode}))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Allow Registrations</h4>
                  <p className="text-xs text-slate-500">Enable new user signups</p>
                </div>
                <button 
                  onClick={() => setSettings(s => ({...s, registrationsEnabled: !s.registrationsEnabled}))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.registrationsEnabled ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.registrationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </SectionCard>

        </motion.div>
      </div>
    </motion.div>
  );
}
