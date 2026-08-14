import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaArrowLeft, FaPrint, FaDownload, FaRobot, FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";
import remarkGfm from "remark-gfm";

export default function AiReport() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve report data passed via state from Documents.jsx
    const report = location.state?.report;

    if (!report) {
        return (
            <div className="p-8 text-center bg-gray-50 h-screen flex flex-col items-center justify-center">
                <FaExclamationTriangle className="text-gray-400 text-4xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">No report found.</h2>
                <p className="text-gray-500 mt-2">Please go back and analyze a document first.</p>
                <button 
                    onClick={() => navigate("/documents")}
                    className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-full font-medium"
                >
                    Back to Documents
                </button>
            </div>
        );
    }

    // Fix literal \n escaping issues from some JSON responses
    const formattedReport = typeof report === 'string' ? report.replace(/\\n/g, '\n') : '';

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadTxt = () => {
        const element = document.createElement("a");
        const file = new Blob([formattedReport], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "PropLens_AI_Analysis_Report.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success("Text report downloaded");
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
                <button 
                    onClick={() => navigate('/documents')}
                    className="flex items-center text-gray-500 hover:text-purple-600 transition font-medium"
                >
                    <FaArrowLeft className="mr-2" /> Back to Documents
                </button>
                
                <div className="flex gap-3">
                    <button 
                        onClick={handleDownloadTxt}
                        className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition"
                    >
                        <FaDownload className="mr-2" /> Download TXT
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition shadow-sm hover:shadow"
                    >
                        <FaPrint className="mr-2" /> Print Report
                    </button>
                </div>
            </div>

            {/* Document Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden print:overflow-visible print:shadow-none print:border-none">
                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20">
                        <FaRobot size={150} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2 opacity-90">
                            <FaRobot size={24} />
                            <span className="font-semibold uppercase tracking-widest text-sm">PropLens AI</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">Document Analysis Report</h1>
                        <p className="mt-2 text-purple-100 opacity-90">Generated dynamically by Gemini Multimodal Vision</p>
                    </div>
                </div>

                {/* Markdown Content */}
                <div className="p-8 md:p-12">
                    <div className="prose prose-purple max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-purple-600">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {formattedReport}
                        </ReactMarkdown>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>This report was generated using Artificial Intelligence and should be verified by a human expert before making any legal or financial decisions.</p>
                </div>
            </div>
        </div>
    );
}
