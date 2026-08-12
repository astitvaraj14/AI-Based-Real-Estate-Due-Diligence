import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import SectionCard from "../cards/SectionCard";

export default function MarketTrendsWidget() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,INR,JPY");
        const data = await response.json();
        setRates(data.rates);
      } catch (err) {
        console.error("Failed to fetch market trends", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-slate-500">Loading Market Data...</div>;
  }

  if (!rates) {
    return null;
  }

  const currencies = [
    { code: "EUR", name: "Euro", value: rates.EUR, trend: "up" },
    { code: "GBP", name: "British Pound", value: rates.GBP, trend: "up" },
    { code: "INR", name: "Indian Rupee", value: rates.INR, trend: "down" },
    { code: "JPY", name: "Japanese Yen", value: rates.JPY, trend: "down" }
  ];

  return (
    <SectionCard 
      title={
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-blue-600" />
          Live Global Market Rates (USD Base)
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        {currencies.map((currency) => (
          <div key={currency.code} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 flex items-center justify-between border border-slate-100 dark:border-slate-700">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{currency.name}</p>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {currency.value.toFixed(2)}
              </h4>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currency.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {currency.trend === 'up' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
