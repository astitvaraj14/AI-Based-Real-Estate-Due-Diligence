import { useState } from "react";
import api from "../../services/api";
import Button from "../ui/Button";

export default function ChangePasswordCard() {

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.put("/users/change-password", form);

      alert("Password changed successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data ||
        "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>
        <label className="mb-2 block font-medium">
          Current Password
        </label>

        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          New Password
        </label>

        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Updating..." : "Change Password"}
      </Button>

    </form>
  );
}