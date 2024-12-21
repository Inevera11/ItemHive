import React, { createContext, useContext, useState, useEffect } from 'react';

// Interfejs dla ustawień
export interface UserSettingsContextType {
    currentCollectionName: string | null;
    setCurrentCollectionName: (collectionName: string) => void;
    currentUsername: string | null;
    setCurrentUsername: (username: string) => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentCollectionName, setCurrentCollectionName] = useState<string | null>(() => {
        const storedCurrentCollectionName = localStorage.getItem('currentCollectionName');
        return storedCurrentCollectionName ? JSON.parse(storedCurrentCollectionName) : null;
    });

    const [currentUsername, setCurrentUsername] = useState<string | null>(() => {
        const storedUsername = localStorage.getItem('currentUsername');
        return storedUsername ? JSON.parse(storedUsername) : null;
    });

    useEffect(() => {
        localStorage.setItem('currentCollectionName', JSON.stringify(currentCollectionName));
    }, [currentCollectionName]);

    useEffect(() => {
        localStorage.setItem('currentUsername', JSON.stringify(currentUsername));
    }, [currentUsername]);

    return (
        <UserSettingsContext.Provider value={{ 
            currentCollectionName,
            setCurrentCollectionName,
            currentUsername,
            setCurrentUsername 
        }}>
            {children}
        </UserSettingsContext.Provider>
    );
};

export const useUserSettings = () => {
    const context = useContext(UserSettingsContext);
    if (!context) {
        throw new Error('useUserSettings must be used within a UserSettingsContextProvider');
    }
    return context;
};