import { SingleCollection, SingleCollectionItem } from './types';

export const createCollection = (collectionName: string, owner: string): SingleCollection => {
    return {
        name: collectionName,
        owner,
        others: [],
        items: [],
    };
};

export const getUpdatedItems = (currentItems: SingleCollectionItem[], newItem: SingleCollectionItem): SingleCollectionItem[] => {
    const itemIdx = currentItems.findIndex((item) => item.id === newItem.id);
    if (itemIdx == -1) {
        return [...currentItems, newItem];
    }
    return currentItems.map((item, index) => (index === itemIdx ? newItem : item));
};
