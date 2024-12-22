import React from 'react';
import useCollections from '../../context/useCollections';

const Debug: React.FC = () => {
    const { allCollections, currentCollectionName, loggedUser } = useCollections();
    return (
        <div style={{ padding: '20px' }}>
            <h1>Current Collection: {currentCollectionName}</h1>
            <h1>Current User: {loggedUser}</h1>
            {allCollections ? <pre>{JSON.stringify(allCollections, null, 4)}</pre> : <p>Collections not found</p>}
        </div>
    );
};

export default Debug;
