import React, { useContext } from 'react';

import { StateContext } from '../Context API/StateContext';
import GeneratorModal from './GeneratorModal';

const CreateAssignment: React.FC = () => {
    const handleModalOpen = () => {
        setModal((prev: boolean) => !prev)
    };
    const { modalOpen, setModal } = useContext(StateContext);
    return (
        <>
            <div className="w-auto h-auto min-h-48 flex items-center justify-between rounded-xl py-0 shadow-lg bg-gradient-to-r from-blue-700 to-purple-700 hover:from-purple-700 hover:to-blue-700 px-8 transition-colors delay-150 duration-1000">
                <div className="flex flex-col text-left"> {/* Left side text container */}
                    <h1 className="text-white text-4xl font-semibold mb-2">Create Assignment</h1>
                    <p className='text-white text-2xl opacity-90'>Fill out the form below to create a new assignment.</p>
                </div>
                <button
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-3xl font-semibold rounded-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                    onClick={handleModalOpen}
                >
                    Create Assignment
                </button>
            </div>
        {modalOpen && (
            <div className="fixed m-auto md:ml-10 w-full h-full flex items-center justify-center">
                <GeneratorModal/>
            </div>
        )}    
        </>
       
    );
};

export default CreateAssignment;