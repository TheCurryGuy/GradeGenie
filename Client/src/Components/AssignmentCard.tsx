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
  Title?: string;
  Deadline?: string;
  userId?: any;
  _id?: any;
  onDelete?: (_id: any) => void;
  [key: string]: any;
}

const AssignmentCard: React.FC<AssignmentProps> = (props) => {
  const {
    Title,
    Deadline,
    Name,
    Class,
    Section,
    RollNo,
    Department,
    Email,
    PhoneNumber,
    hash,
    _id,
    onDelete,
  } = props;

  const informationFields = [
    { key: 'Name', value: Name },
    { key: 'Class', value: Class },
    { key: 'Section', value: Section },
    { key: 'RollNo', value: RollNo },
    { key: 'Department', value: Department },
    { key: 'Email', value: Email },
    { key: 'PhoneNumber', value: PhoneNumber },
  ];


  return (
    <div className="group mb-6 rounded-2xl justify-between flex flex-col shadow-xl bg-white hover:shadow-2xl max-w-sm min-h-76 transition-shadow duration-300 ease-in-out overflow-hidden border border-gray-200 hover:border-blue-gray-300 transform hover:-translate-y-2">
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ellipsis text-gray-800 mb-1 truncate group-hover:text-blue-gray-700 transition-colors duration-200">
            {Title || 'Assignment Title'}
          </h2>
        </div>

        {Deadline && (
          <div className="flex items-center gap-2 mt-3">
            <svg
              className="w-5 h-5 text-indigo-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-lg font-medium text-gray-600 tracking-tight">
              Due Date: <span className="font-semibold text-gray-700">{Deadline}</span>
            </span>
          </div>
        )}
      </div>

      {/* Body Section - Direct Styling for Tags */}
      <div className="px-6 pt-1 pb-3">
        <h3 className="text-md font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Information Required
        </h3>
        <div className="flex flex-wrap gap-2 justify-start">
          {informationFields.map((field) => (
            field.value && (
              <span
                key={field.key}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200`} // Direct styling here
              >
                {field.key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            )
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          {hash && (
            <a
              href={`https://grade-genie.vercel.app/share/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-blue-500 hover:text-blue-700 transition-colors"
              title={`Shareable Link for Assignment: ${Title}`}
            >
              Share Link
            </a>
          )}
          {_id && (
            <span className="font-mono text-gray-500">
              ID: <span className="font-semibold text-gray-600">{_id.substring(0, 8)}</span>...
            </span>
          )}
        </div>
        {onDelete && _id && (
          <button
            onClick={() => onDelete(_id)}
            className="p-2 hover:bg-red-50 rounded-md text-red-500 hover:text-red-700 transition-colors"
            title="Delete assignment"
            aria-label="Delete assignment"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;