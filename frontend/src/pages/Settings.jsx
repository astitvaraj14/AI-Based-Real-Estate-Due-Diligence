import { useState, useEffect } from "react";
import api from "../services/api";
import { FaUser, FaLock, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Settings() {
    const [profile, setProfile] = useState({ fullName: "", email: "", role: "" });
    const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get("/users/profile");
            setProfile(data);
        } catch (error) {
            toast.error("Failed to load profile details");
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put("/users/profile", { fullName: profile.fullName });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        setSavingPassword(true);
        try {
            await api.put("/users/change-password", {
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword
            });
            toast.success("Password updated successfully!");
            setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
    }

    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">
                Account Settings
            </h1>
            <p className="text-gray-600 mb-8">
                Manage your profile information and security settings.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* PROFILE SECTION */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex items-center gap-3 mb-6 text-slate-800 border-b pb-4">
                        <FaUser className="text-blue-600 text-xl" />
                        <h2 className="text-xl font-bold">Profile Details</h2>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                value={profile.email} 
                                disabled
                                className="w-full p-3 rounded-lg border bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Role</label>
                            <input 
                                type="text" 
                                value={profile.role} 
                                disabled
                                className="w-full p-3 rounded-lg border bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                value={profile.fullName}
                                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                                required
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={saving}
                            className="w-full mt-4 flex justify-center items-center gap-2 bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-300"
                        >
                            <FaSave />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>

                {/* SECURITY SECTION */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex items-center gap-3 mb-6 text-slate-800 border-b pb-4">
                        <FaLock className="text-indigo-600 text-xl" />
                        <h2 className="text-xl font-bold">Security</h2>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input 
                                type="password" 
                                value={passwords.oldPassword}
                                onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                                required
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input 
                                type="password" 
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                required
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                                required
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={savingPassword}
                            className="w-full mt-4 flex justify-center items-center gap-2 bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-indigo-300"
                        >
                            <FaLock />
                            {savingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}