import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  Shield,
  Calendar,
  BadgeCheck,
} from "lucide-react";

import api from "../../services/api";
import SectionCard from "../../components/cards/SectionCard";
import { FullPageLoader } from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/users/profile");

      setProfile(data);

      setFormData({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || "",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      const { data } = await api.put("/users/profile", formData);

      setProfile(data);

      setFormData({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || "",
      });

      setEditing(false);

      alert("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    }
  }

  if (loading) {
    return <FullPageLoader title="Loading Profile..." />;
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-xl bg-white dark:bg-slate-900 p-8 shadow">
          <h2 className="text-xl font-bold text-red-600">
            {error}
          </h2>

          <Button
            className="mt-5"
            onClick={loadProfile}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your account information.
          </p>
        </div>

        <div className="flex gap-3">
          {editing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditing(false);
                setFormData({
                  fullName: profile.fullName,
                  email: profile.email,
                  phone: profile.phone || "",
                });
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setEditing(true);
              }
            }}
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {editing ? (
        <SectionCard title="Edit Personal Information">
          <div className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </SectionCard>
      ) : (
        <>
          <SectionCard>
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-md">
                {profile.fullName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {profile.fullName}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {profile.email}
                </p>
                <span className="mt-4 inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
                  {profile.role}
                </span>
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Personal Information">
              <Info
                icon={<User size={18} />}
                label="Full Name"
                value={profile.fullName}
              />
              <Info
                icon={<Mail size={18} />}
                label="Email"
                value={profile.email}
              />
              <Info
                icon={<Phone size={18} />}
                label="Phone"
                value={profile.phone || "-"}
              />
            </SectionCard>

            <SectionCard title="Account Information">
              <Info
                icon={<Shield size={18} />}
                label="Role"
                value={profile.role}
              />
              <Info
                icon={<BadgeCheck size={18} />}
                label="Status"
                value="Active"
              />
              <Info
                icon={<Calendar size={18} />}
                label="Joined"
                value={profile.joinedDate ? new Date(profile.joinedDate).toLocaleDateString() : "-"}
              />
            </SectionCard>
          </div>
        </>
      )}
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 py-4 last:border-none">
      <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-2 text-slate-500 dark:text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="font-semibold text-slate-900 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}