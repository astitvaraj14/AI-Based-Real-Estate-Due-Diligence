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
        <div className="rounded-xl bg-white p-8 shadow">
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
          <h1 className="text-3xl font-bold text-slate-900">
            Profile
          </h1>

          <p className="mt-1 text-slate-500">
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

      <SectionCard>

        <div className="flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
            {(editing ? formData.fullName : profile.fullName)
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div className="flex-1">

            {editing ? (
              <>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mb-3 w-full rounded-lg border border-slate-300 px-4 py-2"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  {profile.fullName}
                </h2>

                <p className="text-slate-500">
                  {profile.email}
                </p>
              </>
            )}

            <span className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
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
            value={editing ? formData.fullName : profile.fullName}
          />

          <Info
            icon={<Mail size={18} />}
            label="Email"
            value={editing ? formData.email : profile.email}
          />

          <Info
            icon={<Phone size={18} />}
            label="Phone"
            value="-"
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
            value="-"
          />

        </SectionCard>

      </div>

    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-none">

      <div className="rounded-lg bg-slate-100 p-2">
        {icon}
      </div>

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