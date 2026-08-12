import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import api from "../services/api";
import { FullPageLoader } from "../components/ui/Loader";
import SectionCard from "../components/cards/SectionCard";
import { Scale } from "lucide-react";

export default function Compare() {
  const [properties, setProperties] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const { data } = await api.get("/properties");
      setProperties(data);
      // Select first two properties by default if available
      if (data.length >= 2) {
        setSelectedIds([data[0].id, data[1].id]);
      } else if (data.length === 1) {
        setSelectedIds([data[0].id]);
      }
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  }

  const toggleProperty = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selId => selId !== id));
    } else {
      if (selectedIds.length >= 4) {
        alert("You can only compare up to 4 properties at once.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (loading) {
    return <FullPageLoader title="Loading Comparison Tool..." />;
  }

  if (properties.length < 2) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mt-8">
        <Scale className="mx-auto mb-4 text-blue-500" size={48} />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Not Enough Properties</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">You need at least 2 properties to use the comparison tool.</p>
      </div>
    );
  }

  const selectedProperties = properties.filter(p => selectedIds.includes(p.id));

  // Data mapping for charts
  const priceData = selectedProperties.map(p => ({ name: p.title.substring(0, 15) + (p.title.length > 15 ? '...' : ''), Price: p.price }));
  const areaData = selectedProperties.map(p => ({ name: p.title.substring(0, 15) + (p.title.length > 15 ? '...' : ''), Area: p.area }));
  const riskData = selectedProperties.map(p => ({ name: p.title.substring(0, 15) + (p.title.length > 15 ? '...' : ''), Score: p.verificationScore }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Scale size={32} className="text-blue-600" /> Multi-Property Compare
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Select up to 4 properties to compare key metrics side-by-side.
        </p>
      </div>

      <SectionCard title="Select Properties">
        <div className="flex flex-wrap gap-3">
          {properties.map(p => (
            <button
              key={p.id}
              onClick={() => toggleProperty(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${selectedIds.includes(p.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </SectionCard>

      {selectedProperties.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8">
          <SectionCard title="Price Comparison ($)">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="Price" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Risk & Verification Score">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Score" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Area Comparison (sq ft)">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={areaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Area" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
          
          {selectedProperties.length >= 3 && (
            <SectionCard title="Risk Polygon Analysis">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Verification Score" dataKey="Score" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          )}
        </div>
      )}
    </div>
  );
}
