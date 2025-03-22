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
interface NumberOfSubmissions {
    NumberOfSubmissions: number;
}

const Submissions = () => {
    const token = localStorage.getItem("token");
    const [submissionsData, setSubmissionsData] = useState<Submission[]>([]);
    const [numberOfSubmissions, setNumberOfSubmissions] = useState<NumberOfSubmissions[]>([]);
    const [combinedData, setCombinedData] = useState<{ [key: number]: Submission }>({});

    useEffect(() => {
        const fetchData = async () => {
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

            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (submissionsData.length == numberOfSubmissions.length) {
            const combined: { [key: number]: Submission } = {};
            for (let i = 0; i < submissionsData.length; i++) {
                combined[numberOfSubmissions[i].NumberOfSubmissions] = submissionsData[i];
            }
            setCombinedData(combined);
        }
    }, []);

    

    return (
        <div>
            {Object.entries(combinedData).map(([numberOfSubmissions, submission]) => (
                <div key={submission._id}>
                    <div>
                        <h1>{submission.Title}</h1>
                        <p>{submission.Description}</p>
                        <p>{submission.Deadline}</p>
                        <p>Number of Submissions: {numberOfSubmissions}</p>
                    </div>
                    <div>
                        <ExportButton hash={submission.hash} />
                    </div>
                </div>

            ))}
        </div>
    );
};

export default Submissions;