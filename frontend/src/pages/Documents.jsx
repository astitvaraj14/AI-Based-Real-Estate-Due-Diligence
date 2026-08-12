import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaShieldAlt, FaChartLine, FaChevronDown, FaChevronUp, FaSpinner, FaRobot, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Documents() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [riskData, setRiskData] = useState({});
    const [comparableData, setComparableData] = useState({});
    const [fetchingDetails, setFetchingDetails] = useState(false);
    
    // AI Document Analysis States
    const [aiAnalysis, setAiAnalysis] = useState({});
    const [analyzingDoc, setAnalyzingDoc] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});

    // Risk Modal State
    const [showRiskModal, setShowRiskModal] = useState(false);
    const [selectedRiskData, setSelectedRiskData] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const { data } = await api.get("/properties");
            setProperties(data);
        } catch (error) {
            toast.error("Failed to load properties");
        } finally {
            setLoading(false);
        }
    };

    const toggleProperty = async (propertyId) => {
        if (expandedId === propertyId) {
            setExpandedId(null);
            return;
        }

        setExpandedId(propertyId);
        
        // Fetch risk and comparable data if not already fetched
        if (!riskData[propertyId] || !comparableData[propertyId]) {
            setFetchingDetails(true);
            try {
                // First try to GET risk, if not exists, POST to generate
                let riskResponse;
                try {
                    riskResponse = await api.get(`/risk/${propertyId}`);
                } catch (e) {
                    riskResponse = await api.post(`/risk/${propertyId}`);
                }
                
                const compResponse = await api.get(`/comparable/${propertyId}`);
                
                setRiskData(prev => ({...prev, [propertyId]: riskResponse.data}));
                setComparableData(prev => ({...prev, [propertyId]: compResponse.data}));
            } catch (error) {
                toast.error("Failed to load property analytics");
            } finally {
                setFetchingDetails(false);
            }
        }
    };

    const getRiskColor = (level) => {
        switch (level) {
            case "LOW": return "text-green-600 bg-green-50 border-green-200";
            case "MEDIUM": return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
            case "VERY HIGH": return "text-red-600 bg-red-50 border-red-200";
            default: return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const handleFileChange = (propertyId, e) => {
        setSelectedFiles(prev => ({...prev, [propertyId]: e.target.files[0]}));
    };

    const handleAnalyze = async (propertyId) => {
        const file = selectedFiles[propertyId];
        if (!file) return toast.error("Please select a document first.");

        setAnalyzingDoc(prev => ({...prev, [propertyId]: true}));
        
        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await api.post(`/ai/documents/analyze?propertyId=${propertyId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            
            if (data.updatedRisk) {
                setRiskData(prev => ({...prev, [propertyId]: data.updatedRisk}));
                toast.success("Document analyzed and risk score dynamically updated!");
            } else {
                toast.success("Document analyzed successfully!");
            }
            
            navigate("/documents/report", { state: { report: data.analysis } });
        } catch (err) {
            toast.error("Failed to analyze document");
        } finally {
            setAnalyzingDoc(prev => ({...prev, [propertyId]: false}));
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading documents...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
                Property Analytics & Documents
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mb-8">
                View Risk Assessments and Comparable Property Analyses for your real estate portfolio.
            </p>

            {properties.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">
                    No properties found. Add a property first to view analytics.
                </div>
            ) : (
                <div className="space-y-4">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-700 overflow-hidden">
                            <div 
                                className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 flex justify-between items-center transition"
                                onClick={() => toggleProperty(property.id)}
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{property.title}</h3>
                                    <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">{property.address}</p>
                                </div>
                                <div className="text-gray-400">
                                    {expandedId === property.id ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </div>

                            {expandedId === property.id && (
                                <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                                    {fetchingDetails ? (
                                        <div className="flex items-center justify-center py-8 text-blue-600 dark:text-blue-400">
                                            <FaSpinner className="animate-spin mr-3" size={24} />
                                            <span className="font-medium">Running Analytics Engine...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                {/* RISK ASSESSMENT PANEL */}
                                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm">
                                                <div className="flex items-center gap-3 mb-4 text-slate-800 dark:text-slate-100">
                                                    <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                                                    <h4 className="text-lg font-bold">Risk Assessment</h4>
                                                </div>
                                                
                                                {riskData[property.id] ? (
                                                    <div className="space-y-4">
                                                        <div className={`p-4 rounded-lg border flex items-center justify-between ${getRiskColor(riskData[property.id].riskLevel)}`}>
                                                            <span className="font-semibold text-lg">Risk Level</span>
                                                            <span className="font-bold text-xl">{riskData[property.id].riskLevel}</span>
                                                        </div>
                                                        <div 
                                                            className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                                            onClick={() => {
                                                                setSelectedRiskData(riskData[property.id]);
                                                                setShowRiskModal(true);
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-600 dark:text-slate-400">Total Risk Score</span>
                                                                <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">View Breakdown</span>
                                                            </div>
                                                            <span className="font-bold text-slate-800 dark:text-slate-200">{riskData[property.id].totalScore} / 100</span>
                                                        </div>
                                                        <div className="mt-4">
                                                            <span className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Recommendation</span>
                                                            <p className="mt-2 text-slate-700 dark:text-slate-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                                                {riskData[property.id].recommendation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500">Risk assessment not available.</p>
                                                )}
                                            </div>

                                            {/* COMPARABLE ANALYSIS PANEL */}
                                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm">
                                                <div className="flex items-center gap-3 mb-4 text-slate-800 dark:text-slate-100">
                                                    <FaChartLine className="text-indigo-600 dark:text-indigo-400 text-xl" />
                                                    <h4 className="text-lg font-bold">Comparable Analysis</h4>
                                                </div>

                                                {comparableData[property.id] ? (
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                                                                <span className="text-sm text-gray-500 dark:text-slate-400 block mb-1">Your Price</span>
                                                                <span className="font-bold text-lg text-slate-800 dark:text-slate-100">₹{comparableData[property.id].propertyPrice?.toLocaleString() || 0}</span>
                                                            </div>
                                                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                                                                <span className="text-sm text-indigo-600 dark:text-indigo-400 block mb-1">Market Avg Price</span>
                                                                <span className="font-bold text-lg text-indigo-900 dark:text-indigo-300">₹{comparableData[property.id].averagePrice?.toLocaleString(undefined, {maximumFractionDigits: 0}) || 0}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg mt-2">
                                                            <span className="text-gray-600 dark:text-slate-400">Avg Price / SqFt</span>
                                                            <span className="font-bold text-slate-800 dark:text-slate-200">₹{comparableData[property.id].averagePricePerSqFt?.toFixed(2) || 0}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                                            <span className="text-gray-600 dark:text-slate-400">Comparables Found</span>
                                                            <span className="font-bold text-slate-800 dark:text-slate-200">{comparableData[property.id].comparablesCount} properties</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500">No comparables available.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* AI DOCUMENT ANALYSIS PANEL */}
                                        <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 shadow-sm">
                                            <div className="flex items-center gap-3 mb-4 text-slate-800 dark:text-slate-100">
                                                <FaRobot className="text-purple-600 dark:text-purple-400 text-xl" />
                                                <h4 className="text-lg font-bold">PropLens AI Document Extraction</h4>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                                                Upload a property document (Sale Deed, Land Registry, Tax Receipt) to automatically extract legal details and detect anomalies.
                                            </p>
                                            
                                            {property.aiReport && (
                                                <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30 flex items-center justify-between">
                                                    <div>
                                                        <h5 className="font-semibold text-purple-900 dark:text-purple-100">Saved Analysis Report Available</h5>
                                                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">An AI due-diligence report is saved for this property.</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => navigate("/documents/report", { state: { report: property.aiReport } })}
                                                        className="bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow transition border border-purple-200 dark:border-purple-700 shrink-0"
                                                    >
                                                        View Saved Report
                                                    </button>
                                                </div>
                                            )}
                                            
                                            <div className="flex items-center gap-4 mb-6">
                                                <input 
                                                    type="file" 
                                                    onChange={(e) => handleFileChange(property.id, e)} 
                                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900/30 dark:file:text-purple-400 dark:hover:file:bg-purple-900/50 transition"
                                                />
                                                <button 
                                                    onClick={() => handleAnalyze(property.id)}
                                                    disabled={analyzingDoc[property.id]}
                                                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition disabled:opacity-50 shrink-0"
                                                >
                                                    {analyzingDoc[property.id] ? <FaSpinner className="animate-spin" /> : <FaUpload />}
                                                    {analyzingDoc[property.id] ? "Analyzing..." : "Analyze with AI"}
                                                </button>
                                            </div>

                                            {/* AI Extraction Results no longer shown inline */}
                                        </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Risk Breakdown Modal */}
            {showRiskModal && selectedRiskData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Risk Score Breakdown</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Detailed penalty points distribution</p>
                            </div>
                            <button 
                                onClick={() => setShowRiskModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-5">
                            {/* Total Summary */}
                            <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">Total Penalty Points</span>
                                <span className={`text-2xl font-bold ${getRiskColor(selectedRiskData.riskLevel).split(' ')[0]}`}>
                                    {selectedRiskData.totalScore} <span className="text-sm text-slate-400 font-normal">/ 100</span>
                                </span>
                            </div>

                            {/* Progress Bars */}
                            {[
                                { label: "Legal & Ownership", value: selectedRiskData.legalRisk, max: 40, color: "bg-red-500" },
                                { label: "Documentation", value: selectedRiskData.documentationRisk, max: 50, color: "bg-orange-500" },
                                { label: "Natural Disaster / Flood", value: selectedRiskData.crimeRisk, max: 20, color: "bg-blue-500" },
                                { label: "Environmental", value: selectedRiskData.environmentalRisk, max: 20, color: "bg-emerald-500" },
                                { label: "Market Volatility", value: selectedRiskData.marketRisk, max: 5, color: "bg-purple-500" },
                                { label: "Infrastructure", value: selectedRiskData.infrastructureRisk, max: 5, color: "bg-cyan-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                        <span className="text-slate-500 font-medium">+{item.value} pts</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className={`${item.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}