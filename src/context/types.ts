export type AllCollectionsData = Array<SingleCollection>;

export type SingleCollection = {
    name: string;
    owner: string;
    others: Array<string>;
    items: Array<SingleCollectionItem>;
};

export type SingleCollectionItem = {
    name: string;
    id: string;
    url: string;
    updates: {
        timestamp: string;
        absoluteAmount: number;
        user: string;
    }[];
};

export type CollectionsContextType = {
    loggedUser: string;
    currentCollectionName: string;
    allCollections: AllCollectionsData;
    initCollections: (username: string) => void;
    updateCollectionItems: (newItem: SingleCollectionItem) => void;
    setCollection: (collectionName: string) => void;
    getUserCollections: (username?: string) => AllCollectionsData;
    getCollection: () => SingleCollection | undefined;
    addCollection: (newCollectionName: string) => void;
    updateCollectionOthers: (newOthers: string[]) => void;
};
