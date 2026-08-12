import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SectionCard from "../cards/SectionCard";
import api from "../../services/api";

// Fix for default Leaflet marker icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function PropertyMap() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const { data } = await api.get("/properties");
      
      const propsWithCoords = await Promise.all(data.map(async (p) => {
        if (p.latitude && p.longitude) return p;
        
        try {
          // Attempt to geocode address + city first
          let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(p.address + ', ' + p.city + ', India')}&limit=1`);
          let geo = await res.json();
          
          // If that fails, try just the city
          if (!geo || geo.length === 0) {
            res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(p.city + ', India')}&limit=1`);
            geo = await res.json();
          }

          // If that fails, try just the address
          if (!geo || geo.length === 0) {
            res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(p.address + ', India')}&limit=1`);
            geo = await res.json();
          }

          if (geo && geo.length > 0) {
            return { ...p, latitude: parseFloat(geo[0].lat), longitude: parseFloat(geo[0].lon) };
          }
        } catch (e) {
          console.warn("Geocoding failed for", p.city);
        }
        
        // Hardcoded fallbacks for demo data with common typos
        if (p.city?.toLowerCase().includes("kumbalgodu")) {
           return { ...p, latitude: 12.8772, longitude: 77.4402 };
        }
        if (p.city?.toLowerCase().includes("bangalore") || p.city?.toLowerCase().includes("bengaluru")) {
           return { ...p, latitude: 12.9716, longitude: 77.5946 };
        }
        
        // Fetch Risk Score for marker color
        let riskLevel = "UNKNOWN";
        let riskScore = 0;
        try {
            let riskRes = await api.get(`/risk/${p.id}`);
            riskLevel = riskRes.data.riskLevel;
            riskScore = riskRes.data.totalScore;
        } catch (e) {
            try {
                let riskRes = await api.post(`/risk/${p.id}`);
                riskLevel = riskRes.data.riskLevel;
                riskScore = riskRes.data.totalScore;
            } catch (e2) {}
        }
        
        return { ...p, latitude: 20.5937, longitude: 78.9629, riskLevel, riskScore };
      }));

      setProperties(propsWithCoords);
      if (propsWithCoords.length > 0) {
        setSelectedProperty(propsWithCoords[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading Map...</div>;
  }

  if (properties.length === 0) {
    return (
      <SectionCard title="Interactive Property Map">
        <div className="p-8 text-center text-slate-500">
          No properties with map coordinates found yet. Add a real address!
        </div>
      </SectionCard>
    );
  }

  const center = selectedProperty 
    ? [selectedProperty.latitude, selectedProperty.longitude] 
    : [properties[0].latitude, properties[0].longitude];

  return (
    <SectionCard title="Interactive Property Map">
      <div className="mb-4">
        <select 
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedProperty(properties.find(p => p.id === parseInt(e.target.value)))}
          value={selectedProperty?.id || ""}
        >
          {properties.map(p => (
            <option key={p.id} value={p.id}>{p.title} - {p.city}</option>
          ))}
        </select>
      </div>

      <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden", zIndex: 0 }}>
        <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={center} />
          {properties.map((prop) => {
            // Determine Marker color based on riskLevel
            // Assuming higher score = higher risk (0-100)
            let iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";
            if (prop.riskLevel === "LOW") {
                iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png";
            } else if (prop.riskLevel === "MEDIUM") {
                iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png";
            } else if (prop.riskLevel === "HIGH" || prop.riskLevel === "VERY HIGH") {
                iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
            }
            
            const customIcon = new L.Icon({
                iconUrl: iconUrl,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            return (
                <Marker key={prop.id} position={[prop.latitude, prop.longitude]} icon={customIcon}>
                  <Popup>
                    <div className="text-sm font-semibold text-slate-800">{prop.title}</div>
                    <div className="text-xs text-slate-500">{prop.address}, {prop.city}</div>
                    <div className="mt-1 text-xs font-bold text-blue-600">₹{prop.price?.toLocaleString()}</div>
                    <div className="mt-2 pt-2 border-t border-slate-200">
                        <div className="text-xs font-semibold">Risk Level: <span className={
                            prop.riskLevel === "LOW" ? "text-green-600" : 
                            prop.riskLevel === "MEDIUM" ? "text-yellow-600" : "text-red-600"
                        }>{prop.riskLevel}</span></div>
                        <div className="text-xs text-slate-500">Risk Score: {prop.riskScore}/100</div>
                    </div>
                  </Popup>
                </Marker>
            );
          })}
        </MapContainer>
      </div>
    </SectionCard>
  );
}
