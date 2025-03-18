import React, { createContext, useState, ReactNode } from 'react';

// Create the context with a default value
export const StateContext = createContext<any>(undefined);

// Define the provider component with children prop
interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [modalOpen, setModal] = useState(false)
    const [isAssignments, setAssignments] = useState(false)
    const [isSubmissions, setSubmissions] = useState(false)
    const [isHome, setHome] = useState(true)
    return (
        <StateContext.Provider value={{
            modalOpen, setModal,
            isAssignments, setAssignments,
            isSubmissions, setSubmissions,
            isHome, setHome,
        }}>
            {children}
        </StateContext.Provider>
    );
};