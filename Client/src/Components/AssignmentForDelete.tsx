
interface AssignmentForDeleteProps {
  title: string;
  
}

const AssignmentForDelete: React.FC<AssignmentForDeleteProps> = ({ title }) =>{
    return (
        <div className="mb-5"> 
            <div className="shadow-lg rounded-lg bg-white p-5">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <button className="text-blue-500 hover:underline">Delete</button>
            </div>
        </div>
    );
}

export default AssignmentForDelete;