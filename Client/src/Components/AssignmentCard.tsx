import React from 'react';

interface AssignmentProps {
  title: string;
  Description: string;
  Link: string;
  Creation: string;
  DueDate: string;
  Status: string;
}

const AssignmentCard: React.FC<AssignmentProps> = ({ title, Description, Link, Creation, DueDate, Status }) => {
  return (
    <div className="mb-5"> 
        <div className="shadow-lg rounded-lg bg-white p-5">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-600">{Description}</p>
            <a href={Link} className="text-blue-500 hover:underline">{Link}</a>
            <p className="text-gray-600">Date of Creation: {Creation}</p>
            <p className="text-gray-600">Due Date: {DueDate}</p>
            <p className="text-gray-600">Status: {Status}</p>
        </div>
    </div>
  );
};

export default AssignmentCard;
