import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import Button from "../ui/Button";

export default function WelcomeCard({ dashboard }) {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">

            <CalendarDays size={16} />

            {today}

          </div>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">

            {greeting},
            <span className="text-blue-600"> Administrator 👋</span>

          </h1>

          <p className="mt-3 max-w-xl text-slate-500">

            Here's an overview of today's property verification activity.

          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-4">

          <Button
            variant="primary"
            rightIcon={<ArrowRight size={18} />}
            onClick={() => navigate("/add-property")}
          >
            Add Property
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/properties")}
          >
            View Properties
          </Button>

        </div>

      </div>

    </section>
  );
}