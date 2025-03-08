import React, { createContext, useState, ReactNode } from 'react';


// Create the context with a default value
export const StateContext = createContext<any>(undefined);

// Define the provider component with children prop
interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [modalOpen, setModal] = useState(false)
    const [isDashboard, setDashboard] = useState(true)
    const [isYoutube, setYoutube] = useState(false)
    const [isTwitter, setTwitter] = useState(false)
    const [isContent, setContent] = useState(false)
    const [isNote, setNote] = useState(false)
    const [isChat, setChat] = useState(false)

    return (
        <StateContext.Provider value={{
            modalOpen, setModal,
            isNote, setNote,
            isYoutube, setYoutube,
            isTwitter, setTwitter,
            isContent, setContent,
            isDashboard, setDashboard,
            isChat, setChat
        }}>
            {children}
        </StateContext.Provider>
    );
};
