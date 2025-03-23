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
                setError("Failed to fetch data.  Please check your network and try again.");
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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Submissions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {combinedData.map((item) => (
                    <div key={item.submission._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-xl font-semibold text-gray-800">{item.submission.Title}</h2>
                        <p className="text-gray-600 mt-2">{item.submission.Description}</p>
                        <p className="text-sm text-gray-500 mt-2">Deadline: {item.submission.Deadline}</p>
                        <p className="text-sm text-gray-700">Submissions: {item.count}</p>
                        <div className="mt-4">
                            <ExportButton hash={item.submission.hash} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submissions;