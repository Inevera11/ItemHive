import React, { createContext, useContext, useState, useEffect } from 'react';
import { initData } from './initData';

// TODO
// Interfejs dla danych o przedmiocie, kiedy będzie dodawane więcej kolekcji niż 1, wtedy trzeba będzie przypisać informacje o kolekcji do której należy przedmiot
export interface Item {
    identifier: string;
    name: string;
    updates: {
        timestamp: number;
        absoluteAmount: number;
        user: string;
    }[];
}

interface CollectionContextType {
    items: Item[];
    initItems: () => void;
    addItem: (item: Item) => void;
    setItems: (items: Item[]) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>(() => {
        // Dane o kolekcji są przechowywane jako JSON w postaci string w localstorage, więc są dostępne po odświeżaniu
        const storedItems = localStorage.getItem('collectionItems');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    const addItem = (item: Item) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems, item];
            localStorage.setItem('collectionItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const replaceItems = (newItems: Item[]) => {
        setItems(newItems);
        localStorage.setItem('collectionItems', JSON.stringify(newItems));
    };

    const initItems = () => {
        replaceItems(initData);
    };

    useEffect(() => {
        localStorage.setItem('collectionItems', JSON.stringify(items));
    }, [items]);

    return <CollectionContext.Provider value={{ items, addItem, setItems: replaceItems, initItems }}>{children}</CollectionContext.Provider>;
};

export const useCollection = () => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }
    return context;
};
