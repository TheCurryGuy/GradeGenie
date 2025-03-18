import Assignments from "./Assignments";
import CreateAssignment from "./CreateAssignment";

const FinalAssignment = () => {
    return (
        <div className="p-12" >
            <h1 className="text-4xl mb-5 font-bold font-mono">Assignment</h1>
            <CreateAssignment/>
            <Assignments/>
        </div>
    );
}
export default FinalAssignment;