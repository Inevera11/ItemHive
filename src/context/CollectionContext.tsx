import React, { useState, useEffect, createContext } from 'react';

import { AllCollectionsData, CollectionsContextType, SingleCollection, SingleCollectionItem } from './types';
import { createCollection, getUpdatedItems } from './modifyCollections';
import { getMockedCollections } from './mockedCollections';

// eslint-disable-next-line react-refresh/only-export-components
export const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const CollectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedCollections = localStorage.getItem('collectionItems');
    const storedUser = localStorage.getItem('loggedUser');
    const storedCurrentCollectionName = localStorage.getItem('currentCollectionName');

    const [allCollections, setAllCollections] = useState<AllCollectionsData>(storedCollections ? JSON.parse(storedCollections) : []);
    const [currentCollectionName, setCurrentCollectionName] = useState<string>(storedCurrentCollectionName ? storedCurrentCollectionName : '');
    const [loggedUser, setLoggedUser] = useState<string>(storedUser ? storedUser : '');

    useEffect(() => {
        localStorage.setItem('collectionItems', JSON.stringify(allCollections));
    }, [allCollections]);
    useEffect(() => {
        localStorage.setItem('loggedUser', loggedUser);
    }, [loggedUser]);
    useEffect(() => {
        localStorage.setItem('currentCollectionName', currentCollectionName);
    }, [currentCollectionName]);

    const updateCollectionItems = (item: SingleCollectionItem) => {
        setAllCollections((prevCollections) =>
            prevCollections.map((collection) =>
                collection.name === currentCollectionName
                    ? {
                          ...collection,
                          items: getUpdatedItems(collection.items, item),
                      }
                    : collection
            )
        );
    };

    const removeCollectionItem = (itemName: string) => {
        setAllCollections((prevCollections) =>
            prevCollections.map((collection) =>
                collection.name === currentCollectionName
                    ? {
                          ...collection,
                          items: collection.items.filter((item) => item.name !== itemName && item.url !== itemName),
                      }
                    : collection
            )
        );
    };

    const updateCollectionOthers = (newOthers: string[]) => {
        setAllCollections((prevCollections) =>
            prevCollections.map((collection) =>
                collection.name === currentCollectionName
                    ? {
                          ...collection,
                          others: newOthers,
                      }
                    : collection
            )
        );
    };

    const initCollections = (username: string) => {
        if (allCollections.length === 0) {
            const mockedData = getMockedCollections(username);
            setAllCollections(mockedData);
            setCurrentCollectionName(mockedData[0].name);
        } else {
            const usersCollections = getUserCollections(username);
            setCurrentCollectionName(usersCollections.length > 0 ? usersCollections[0].name : '');
        }
        setLoggedUser(username);
    };

    const setCollection = (collectionName: string) => {
        const idx = allCollections.findIndex((collection) => collection.name == collectionName);
        setCurrentCollectionName(idx === -1 ? '' : collectionName);
    };
    const getCollection = (): SingleCollection | undefined => {
        if (currentCollectionName === '') {
            return;
        }
        return allCollections.find((collection) => collection.name === currentCollectionName);
    };

    const addCollection = (newCollectionName: string) => {
        const newCollection = createCollection(newCollectionName, loggedUser);
        setAllCollections((prev) => [...prev, newCollection]);
        setCurrentCollectionName(newCollectionName);
    };

    const getUserCollections = (username?: string): AllCollectionsData => {
        const user = username ? username : loggedUser;
        const userIsOwner = allCollections.filter((collection) => collection.owner === loggedUser);
        const userIsOthers = allCollections.filter((collection) => collection.others.includes(user));

        return [...userIsOthers, ...userIsOwner];
    };

    const fields = {
        loggedUser,
        allCollections,
        currentCollectionName
    };

    const functions = {
        updateCollectionItems,
        updateCollectionOthers,
        getUserCollections,
        setCollection,
        initCollections,
        getCollection,
        addCollection,
        removeCollectionItem,
    };

    return <CollectionsContext.Provider value={{ ...fields, ...functions }}>{children}</CollectionsContext.Provider>;
};
