import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StateContext } from "../Context API/StateContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Results = () => {
    const { ocrOutput, sub_id } = useContext(StateContext);
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
                    "http://localhost:3000/api/v1/result",
                    { ocrText: ocrOutput, sub_id },
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
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl text-purple-700 font-medium">
                        Processing your submission...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Occurred</h3>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 bg-purple-50 px-6 py-4">
                        <h1 className="text-2xl font-bold text-purple-800">Assignment Results</h1>
                    </div>
                    <div className="p-6">
                        <div className="prose max-w-none">
                            <ReactMarkdown>{markdownContent}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;