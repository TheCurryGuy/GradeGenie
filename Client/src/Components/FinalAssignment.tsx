import CreateAssignment from "./CreateAssignment";
import Assignments from "./Assignments";

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