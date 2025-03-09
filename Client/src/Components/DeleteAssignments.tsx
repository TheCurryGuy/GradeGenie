import React from 'react';
import AssignmentForDelete from './AssignmentForDelete';

const DeleteAssignments: React.FC = () => {
    
    const [assignments, setAssignments] = React.useState([]);
    const token = localStorage.getItem('token');
    console.log(token);
    React.useEffect(() => {
        if (token) {
            fetch('', {
                method: 'GET',
                headers: {  Authorization: `Bearer ${token}` },     
            })
            .then((response) => response.json())        
            .then((data) => setAssignments(data))
            .catch((error) => console.log(error));
            }
            }, [token]);
            return (
                <div className="flex flex-col gap-3 overflow-y-clip rounded-2xl p-5">
                    <h1> Delete Assignments </h1>
                    {assignments.map((assignment: any) => (
                        <AssignmentForDelete
                            key={assignment.id}
                            title={assignment.title}
                        />
                    ))}
                </div>)
}

export default DeleteAssignments;