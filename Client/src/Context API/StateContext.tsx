import React, { createContext, useState, ReactNode } from 'react';

// Create the context with a default value
export const StateContext = createContext<any>(undefined);

// Define the provider component with children prop
interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [modalOpen, setModal] = useState(false)

    const [isHome, setHome] = useState(true)
    const [isAssignments, setAssignments] = useState(false)
    const [isSubmissions, setSubmissions] = useState(false)
    return (
        <StateContext.Provider value={{
            modalOpen, setModal,

            isHome, setHome,
            isAssignments, setAssignments,
            isSubmissions, setSubmissions
        }}>
            {children}
        </StateContext.Provider>
    );
};