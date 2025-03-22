import axios from 'axios';

interface ExportButtonProps {
    hash: string;  // Add a prop for the submission hash
}

export default function ExportButton({ hash }: ExportButtonProps) {
    const token = localStorage.getItem('token');

    const handleExport = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/export`, {
                hash: hash,  
            }, {
                headers: {
                    token: token,
                },
                responseType: 'blob',  
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `submissions.csv`); // Consistent filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up
        } catch (error: any) {
            console.error("Error exporting data:", error);
            alert("Error exporting data.  See console for details.");
        }
    };

    return (
        <button onClick={handleExport}>
            Export as CSV
        </button>
    );
}