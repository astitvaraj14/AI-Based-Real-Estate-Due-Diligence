import { useState, useEffect } from "react";
import api from "../services/api";
import { FaFilePdf, FaFileExcel, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Reports() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const { data } = await api.get("/properties");
            setProperties(data);
        } catch (error) {
            toast.error("Failed to load properties for reports");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPdf = async (propertyId, propertyTitle) => {
        try {
            const response = await api.get(`/export/pdf/${propertyId}`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Due_Diligence_Report_${propertyTitle}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success("PDF Downloaded successfully!");
        } catch (error) {
            toast.error("Failed to generate PDF report");
        }
    };

    const handleDownloadExcel = async (propertyId, propertyTitle) => {
        try {
            const response = await api.get(`/export/excel/${propertyId}`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Due_Diligence_Report_${propertyTitle}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success("Excel Downloaded successfully!");
        } catch (error) {
            toast.error("Failed to generate Excel report");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading reports...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
                Due Diligence Reports
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mb-8">
                Generate and download comprehensive due diligence reports for your registered properties.
            </p>

            {properties.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">
                    No properties found. Add a property first to generate a report.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 truncate">
                                {property.title}
                            </h3>
                            <p className="text-gray-500 dark:text-slate-400 text-sm mb-4 truncate">
                                {property.address}, {property.city}
                            </p>
                            
                            <div className="flex items-center justify-between mt-6 pt-4 border-t dark:border-slate-700">
                                <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Export Report</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleDownloadPdf(property.id, property.title)}
                                        className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition"
                                        title="Download PDF"
                                    >
                                        <FaFilePdf size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDownloadExcel(property.id, property.title)}
                                        className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition"
                                        title="Download Excel"
                                    >
                                        <FaFileExcel size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}