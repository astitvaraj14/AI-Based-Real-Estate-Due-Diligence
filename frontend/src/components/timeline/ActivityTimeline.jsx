import {
    BadgeCheck,
    Clock3,
    XCircle,
    MapPin,
  } from "lucide-react";
  
  import SectionCard from "../cards/SectionCard";
  
  export default function ActivityTimeline({
    properties = [],
  }) {
    const getStatusIcon = (status) => {
      switch ((status || "").toLowerCase()) {
        case "verified":
          return <BadgeCheck size={18} className="text-emerald-600" />;
  
        case "pending":
          return <Clock3 size={18} className="text-amber-600" />;
  
        case "rejected":
          return <XCircle size={18} className="text-red-600" />;
  
        default:
          return <MapPin size={18} className="text-slate-500" />;
      }
    };
  
    return (
      <SectionCard
        title="Recent Activity"
        subtitle="Latest verification updates"
      >
        <div className="space-y-6">
  
          {properties.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              No recent activity.
            </p>
          )}
  
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex gap-4"
            >
  
              <div className="flex flex-col items-center">
  
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  {getStatusIcon(property.verificationStatus)}
                </div>
  
                <div className="mt-2 h-full w-px bg-slate-200" />
  
              </div>
  
              <div className="pb-4">
  
                <h3 className="font-medium text-slate-900">
                  {property.title}
                </h3>
  
                <p className="mt-1 text-sm text-slate-500">
                  {property.verificationStatus} by {property.ownerName}
                </p>
  
                <p className="mt-1 text-xs text-slate-400">
                  {property.verificationDate
                    ? new Date(
                        property.verificationDate
                      ).toLocaleDateString()
                    : new Date(
                        property.registrationDate
                      ).toLocaleDateString()}
                </p>
  
              </div>
  
            </div>
          ))}
  
        </div>
      </SectionCard>
    );
  }