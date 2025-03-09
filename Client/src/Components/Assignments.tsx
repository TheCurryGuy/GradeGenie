import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import axios from 'axios';

interface Assignment {
  id: number;
  title: string;
  description: string;
  link: string;
  creation: string;
  dueDate: string;
  status: string;
}

const Assignments: React.FC = () => {

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  console.log(token);
  useEffect(() => {
    // if (token) {
    // const fetchAssignments = async () => {
    //   const response = await fetch('');
    //   const data = await response.json();
    //   setAssignments(data);
    //   setLoading(false);
    // };
    // fetchAssignments();
    if (token) {
        const fetchAssignments = async () => {
          try {
            const response = await axios.get('', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setAssignments(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching assignments:', error);
            setLoading(false);
          }
        };
        fetchAssignments();
}
    
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Assignments</h1>
      <div>

      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-clip">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              title={assignment.title}
              Description={assignment.description}
              Link={assignment.link}
              Creation={assignment.creation}
              DueDate={assignment.dueDate}
              Status={assignment.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Assignments;