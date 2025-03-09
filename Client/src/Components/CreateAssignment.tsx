import React, { useContext } from 'react';

import { StateContext } from '../Context API/StateContext';

const CreateAssignment: React.FC = () => {
    const handleModalOpen = () => {
        setModal((prev: boolean) => !prev)
        
        console.log('Assignment created');
    };
    const { modalOpen, setModal } = useContext(StateContext);
    return (
        <>
         <div className="w-full h-48 items-center justify-between rounded-xl shadow-lg bg-neutral-900 p-7">
            <h1 className="text-white text-3xl text-left">Create Assignment</h1>
            <p className='text-white text-xl text-left'>Fill out the form below to create a new assignment.</p>
            <button className="bg-blue-500 rounded-xl" onClick={handleModalOpen}>Create Assignment</button>
        </div>
        {modalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-blue-600 bg-opacity-50 flex items-center justify-center">
                hii
            </div>
        )}
               
        </>
       
    );
};

export default CreateAssignment;