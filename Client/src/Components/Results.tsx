import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StateContext } from "../Context API/StateContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Results = () => {
    const { ocrOutput, sub_id, studentName } = useContext(StateContext);
    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!ocrOutput || !sub_id) {
            navigate("/");
            return;
        }

        const abortController = new AbortController();

        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    "https://grade-genie-server.vercel.app/api/v1/result",
                    { ocrText: ocrOutput, sub_id},
                    { signal: abortController.signal }
                );

                if (response.data.result) {
                    setMarkdownContent(response.data.result);
                }
                setLoading(false);
            } catch (err) {
                if (!abortController.signal.aborted) {
                    console.error("Error fetching results:", err);
                    setError("Failed to load results. Please try again.");
                    setLoading(false);
                }
            }
        };

        fetchResults();

        return () => {
            abortController.abort();
        };
    }, [ocrOutput, sub_id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex justify-center items-center p-4">
                <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-5"></div>
                    <p className="text-xl text-purple-700 font-medium mb-2">
                        Processing your submission...
                    </p>
                    <p className="text-gray-500 text-sm text-center max-w-md">
                        We're analyzing your work. This may take a moment depending on the complexity of your submission.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex justify-center items-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-6">
                        <div className="rounded-full bg-red-100 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Error Occurred</h3>
                    <p className="text-gray-600 text-center mb-6">{error}</p>
                    <div className="flex justify-center">
                        <button 
                            onClick={() => navigate("/")}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 bg-purple-100 px-6 py-5">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <h1 className="text-2xl font-bold text-purple-800">Evaluated Results of {studentName}</h1>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => window.print()} 
                                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Print
                                </button>
                                <button 
                                    onClick={() => navigate("/")}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1.5 px-3 rounded transition-colors flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 sm:p-8">
                        <div className="prose prose-purple max-w-none">
                            <ReactMarkdown>{markdownContent}</ReactMarkdown>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Results generated by GradeGenie based on your submission. 
                            For any questions regarding this evaluation, please contact your instructor.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;