import React from 'react';
import { useCollections } from '../../context/CollectionContext';
import { useUserSettings } from '../../context/UserSettingsContext';

const Debug: React.FC = () => {
    const { collections } = useCollections();
    const { currentCollectionName, currentUsername } = useUserSettings();
    return (
        <div style={{ padding: '20px' }}>
            <h1>Current Collection: {currentCollectionName}</h1>
            <h1>Current User: {currentUsername}</h1>
            {collections ? (
                <pre>{JSON.stringify(collections, null, 4)}</pre>
            ) : (
                <p>Collections not found</p>
            )}
        </div>
    );
};

export default Debug;