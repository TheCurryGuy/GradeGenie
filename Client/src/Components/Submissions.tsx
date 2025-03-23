import { useEffect, useState } from "react";
import axios from "axios";
import ExportButton from "./ExportButton";

interface Submission {
    _id: string;
    Title: string;
    Description: string;
    Deadline: string;
    hash: string;
}

const Submissions = () => {
    const token = localStorage.getItem("token");
    const [submissionsData, setSubmissionsData] = useState<Submission[]>([]);
    const [numberOfSubmissions, setNumberOfSubmissions] = useState<number[]>([]);
    const [combinedData, setCombinedData] = useState<{ submission: Submission; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/latest/assignments",
                    {
                        headers: {
                            token: token,
                        },
                    }
                );
                setSubmissionsData(response.data.assignments);
                setNumberOfSubmissions(response.data.submissionCounts);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please check your network and try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (submissionsData.length > 0 && numberOfSubmissions.length > 0 && submissionsData.length === numberOfSubmissions.length) {
            const combined = submissionsData.map((submission, index) => ({
                submission: submission,
                count: numberOfSubmissions[index],
            }));
            setCombinedData(combined);
        }
    }, [submissionsData, numberOfSubmissions]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-red-500 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Error</h2>
                <p>{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Format date to a more readable format
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate if deadline is approaching (within 3 days)
    const isDeadlineApproaching = (deadlineString: string) => {
        const deadline = new Date(deadlineString);
        const now = new Date();
        const diffTime = deadline.getTime() - now.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 3 && diffDays > 0;
    };

    // Check if deadline has passed
    const isDeadlinePassed = (deadlineString: string) => {
        const deadline = new Date(deadlineString);
        const now = new Date();
        return deadline < now;
    };

    return (
        <div className="w-full max-w-full p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Submissions</h1>
                    <p className="text-gray-500 mt-1">Manage and export your assignment submissions</p>
                </div>
                <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {combinedData.length} {combinedData.length === 1 ? 'assignment' : 'assignments'} found
                </div>
            </div>
            
            {combinedData.length === 0 ? (
                <div className="w-full bg-white rounded-lg shadow-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-xl font-medium text-gray-700 mb-2">No submissions found</h2>
                    <p className="text-gray-500 max-w-md mx-auto">There are no assignments or submissions available at this time.</p>
                </div>
            ) : (
                <div className="w-full flex flex-col space-y-6">
                    {combinedData.map((item) => {
                        const deadlineApproaching = isDeadlineApproaching(item.submission.Deadline);
                        const deadlinePassed = isDeadlinePassed(item.submission.Deadline);
                        
                        return (
                            <div 
                                key={item.submission._id} 
                                className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <h2 className="text-xl font-semibold text-gray-800">{item.submission.Title}</h2>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            deadlinePassed 
                                                ? 'bg-red-50 text-red-600' 
                                                : deadlineApproaching 
                                                    ? 'bg-yellow-50 text-yellow-700' 
                                                    : 'bg-green-50 text-green-600'
                                        }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {deadlinePassed 
                                                ? 'Deadline passed' 
                                                : deadlineApproaching 
                                                    ? 'Deadline approaching' 
                                                    : 'Active'
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white border border-gray-100 rounded-md mb-4 relative pl-4">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-md"></div>
                                        <div className="py-3 pr-4">
                                            <div className="flex items-center mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Description</span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                {item.submission.Description || "No description provided for this assignment."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 px-6 py-3 flex flex-wrap md:flex-nowrap items-center justify-between border-t border-gray-100">
                                    <div className="flex flex-wrap items-center gap-6 mb-3 md:mb-0">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 font-medium">Deadline</div>
                                                <div className={`text-sm font-medium ${deadlinePassed ? 'text-red-600' : deadlineApproaching ? 'text-yellow-700' : 'text-gray-700'}`}>
                                                    {formatDate(item.submission.Deadline)}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-1.5 rounded-full mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 font-medium">Submissions</div>
                                                <div className="text-sm font-medium text-gray-700">
                                                    {item.count} {item.count === 1 ? 'response' : 'responses'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ExportButton hash={item.submission.hash} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Submissions;