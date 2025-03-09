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
    Questions?: string;
    Title?: string;
    Description?: string;
    Deadline?: string;
    userId?: any;
 // Or mongoose.Types.ObjectId if you are using mongoose types directly
    [key: string]: any;
}

const Assignments: React.FC = () => {

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  console.log(token);
  useEffect(() => {
    if (token) {
        const fetchAssignments = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/get/latest/1', { // **Correct Endpoint URL**
              headers: {
                token: `Bearer ${token}` // **Include Authorization header**
              }
            });
            // Assuming your backend response is { data: [ ...assignments... ] }
            setAssignments(response.data.data); // **Access response.data.data to set assignments**
            setLoading(false);
          } catch (error: any) { // **Type error as any for better error handling**
            console.error('Error fetching assignments:', error);
            setLoading(false);
            // Optionally handle error messages to display to user
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.error('Request error:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message:', error.message);
            }
          }
        };
        fetchAssignments();
} else {
    setLoading(false); // If no token, stop loading as well
    console.warn('No token found, user likely not logged in.');
    // Optionally redirect to login page or handle no-token scenario
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
              Title={assignment.Title} // **Use _id from MongoDB as key, assuming it's in your data** 
              Description={assignment.Description}
              Name= {assignment.Name}
              Class = {assignment.Class}
              Section  = {assignment.Section}
              RollNo  = {assignment.RollNo}
              Department  = {assignment.Department}
              Email = {assignment.Email}
              PhoneNumber  = {assignment.PhoneNumber}
              Deadline = {assignment.Deadline}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Assignments;