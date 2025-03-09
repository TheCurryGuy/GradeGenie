import React from 'react';

interface AssignmentProps {
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
  _id?: any; // Assuming MongoDB _id is available
  [key: string]: any;
}

const AssignmentCard: React.FC<AssignmentProps> = (props) => {
  const {
    Title,
    Description,
    Deadline,
    Name,
    Class,
    Section,
    RollNo,
    Department,
    Email,
    PhoneNumber,
    _id // Destructure _id as well if available
  } = props;

  return (
    <div className="mb-4 rounded-xl shadow-md bg-white overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{Title || 'Assignment Title'}</div> {/* Display Title or default */}
        <p className="text-gray-700 text-base">
          {Description || 'No description provided.'} {/* Display Description or default */}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {Deadline && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Deadline: {Deadline}
          </span>
        )}
        {Name && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Name Required
          </span>
        )}
        {Class && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Class Required
          </span>
        )}
        {Section && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Section Required
          </span>
        )}
        {RollNo && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Roll No Required
          </span>
        )}
        {Department && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Department Required
          </span>
        )}
        {Email && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Email Required
          </span>
        )}
        {PhoneNumber && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Phone Number Required
          </span>
        )}
        {/* You can add more fields here as needed, conditionally rendering them */}
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          {_id && <span className="text-gray-500 text-sm">Assignment ID: {_id.substring(0, 8)}...</span>} {/* Display shortened ID if available */}
          {/* Add any action buttons or links here if needed, e.g., "View Details" button */}
      </div>
    </div>
  );
};

export default AssignmentCard;