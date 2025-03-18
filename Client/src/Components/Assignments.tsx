import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import axios from 'axios';
interface Assignment {
    Name?: boolean;
    Class?: boolean;
    Section?: boolean;
    RollNo?: boolean;
    Department?: boolean;
    Email?: boolean;
    PhoneNumber?: boolean;
    hash?: string;
    Title?: string;
    Deadline?: string;
    userId?: any;
    _id?: string; 
    [key: string]: any;
}

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/get/latest/all', {
        headers: { token: token || '' }
      });
      setAssignments(response.data.data);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching assignments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAssignments();
    } else {
      setLoading(false);
      console.warn('No token found');
    }
  }, [token]);

  const handleDelete = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/v1/delete`, {
        headers: { 
          token: token || ''
        },
        data: { _id } 
      });
      await fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Failed to delete assignment');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5 mt-4">Existing Assignments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-3 overflow-y-clip">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id || assignment.Title}
              {...assignment}
              onDelete={handleDelete}
              _id={assignment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;