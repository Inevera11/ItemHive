import React, { createContext, useContext, useState, useEffect } from 'react';
import { initData } from './initData';
import { sanitizeForUrl } from './sanitizeForUrl';

// Interfejs dla danych o przedmiocie
export interface Item {
    name: string;
    updates: {
        timestamp: Date;
        absoluteAmount: number;
        user: string;
    }[];
}

// Interfejs dla kolekcji
export interface Collection {
    name: string;
    whitelist: string[];
    items: Item[];
}

// Udostępniane metody i pola CollectionsContext
interface CollectionsContextType {
    collections: Collection[];
    initCollections: () => void;
    addItemToCollection: (collectionName: string, item: Item) => void;
    updateItemInCollection: (collectionName: string, item: Item) => void;
    setCollection: (collectionName: string, collection: Collection) => void;
    getCollection: (collectionName: string) => Collection | undefined;
    addCollection: (collectionName: string, user: string) => void;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const CollectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collections, setCollections] = useState<Collection[]>(() => {
        const storedCollections = localStorage.getItem('collectionItems');
        return storedCollections ? JSON.parse(storedCollections) : [];
    });

    const addItemToCollection = (collectionName: string, item: Item) => {
        setCollections((prevCollections) => {
            const updatedCollections = prevCollections.map(collection => {
                if (collection.name === collectionName) {
                    const sanitizedName = sanitizeForUrl(item.name);
                    const itemExists = collection.items.some(existingItem => sanitizeForUrl(existingItem.name) === sanitizedName);
                    if (itemExists) {
                        console.error(`Item with sanitized name ${sanitizedName} already exists in collection ${collectionName}.`);
                        return collection;
                    }
                    return {
                        ...collection,
                        items: [...collection.items, item]
                    };
                }
                return collection;
            });
            localStorage.setItem('collectionItems', JSON.stringify(updatedCollections));
            return updatedCollections;
        });
    };

    const updateItemInCollection = (collectionName: string, itemName: string, timestamp: Date, absoluteAmount: number, user: string) => {
        setCollections((prevCollections) => {
            const updatedCollections = prevCollections.map(collection => {
                if (collection.name === collectionName) {
                    const sanitizedName = sanitizeForUrl(itemName);
                    const itemToUpdate = collection.items.find(item => sanitizeForUrl(item.name) === sanitizedName);
                    if (itemToUpdate) {
                        const newUpdate = {
                            timestamp,
                            absoluteAmount,
                            user
                        };
                        return {
                            ...collection,
                            items: collection.items.map(item => 
                                sanitizeForUrl(item.name) === sanitizedName 
                                    ? { ...item, updates: [...item.updates, newUpdate] } 
                                    : item
                            )
                        };
                    }
                }
                return collection;
            });
            localStorage.setItem('collectionItems', JSON.stringify(updatedCollections));
            return updatedCollections;
        });
    };

    const setCollection = (collectionName: string, newCollection: Collection) => {
        setCollections((prevCollections) => {
            const updatedCollections = prevCollections.map(collection => {
                if (collection.name === collectionName) {
                    return newCollection;
                }
                return collection;
            });
            localStorage.setItem('collectionItems', JSON.stringify(updatedCollections));
            return updatedCollections;
        });
    };

    const getCollection = (collectionName: string): Collection | undefined => {
        return collections.find(collection => collection.name === collectionName);
    };

    const addCollection = (collectionName: string, user: string) => {
        const newCollection: Collection = {
            name: collectionName,
            whitelist: [user], // Twórca kolekcji jest dodany na początku w liście użytkownikóœ
            items: []
        };

        setCollections((prevCollections) => {
            const updatedCollections = [...prevCollections, newCollection];
            localStorage.setItem('collectionItems', JSON.stringify(updatedCollections));
            return updatedCollections;
        });
    };

    const initCollections = () => {
        localStorage.setItem('collectionItems', JSON.stringify(initData));
        setCollections(initData);
    };

    useEffect(() => {
        localStorage.setItem('collectionItems', JSON.stringify(collections));
    }, [collections]);

    return (
        <CollectionsContext.Provider value={{ collections, addItemToCollection, setCollection, initCollections, getCollection, addCollection, updateItemInCollection }}>
            {children}
        </CollectionsContext.Provider>
    );
};

export const useCollections = () => {
    const context = useContext(CollectionsContext);
    if (!context) {
        throw new Error('useCollections must be used within a CollectionsProvider');
    }
    return context;
};