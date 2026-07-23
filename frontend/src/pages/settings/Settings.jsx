import { Settings, Shield, User } from "lucide-react";
import SectionCard from "../../components/cards/SectionCard";
import ChangePasswordCard from "../../components/settings/ChangePasswordCard";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
          <Settings size={32} />
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account settings and security.
        </p>
      </div>

      <SectionCard
        title={
          <div className="flex items-center gap-2">
            <User size={20} />
            Account
          </div>
        }
      >
        <p className="text-slate-600">
          Update your profile information from the Profile page.
        </p>
      </SectionCard>

      <SectionCard
        title={
          <div className="flex items-center gap-2">
            <Shield size={20} />
            Security
          </div>
        }
      >
        <ChangePasswordCard />
      </SectionCard>

    </div>
  );
}