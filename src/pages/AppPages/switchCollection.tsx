import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import useCollections from '../../context/useCollections';

const SwitchCollection = () => {
    const { getUserCollections, currentCollectionName, setCollection, addCollection } = useCollections();
    const [selectedCollection, setSelectedCollection] = useState<string>(currentCollectionName || '');
    const [newCollectionName, setNewCollectionName] = useState<string>('');

    const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollection(event.target.value);
    };
    const handleSwitchCollection = () => {
        setCollection(selectedCollection);
    };
    const handleCreateCollection = () => {
        if (newCollectionName.trim() === '') {
            alert('Nazwa kolekcji musi być niepusta');
            return;
        }
        addCollection(newCollectionName);
        setSelectedCollection(newCollectionName);
        setNewCollectionName('');
    };
    const userCollections = getUserCollections();
    return (
        <div className="h-screen pt-10">
            <h1 className="text-center">{currentCollectionName ? `Aktualnie oglądasz kolekcję: ${currentCollectionName}` : 'Nie wybrano kolekcji'}</h1>
            <div className="flex items-end flex-col pr-[10%] gap-10 mt-10">
                <label className="flex gap-10">
                    Zmień aktualnie oglądaną kolekcję:
                    {userCollections.length > 0 ? (
                        <select className="bg-yellow-300" value={selectedCollection} onChange={handleCollectionChange}>
                            <option value="" disabled>
                                Select a collection
                            </option>
                            {userCollections.map((collection) => (
                                <option key={collection.name} value={collection.name}>
                                    {collection.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span className="text-red-500">Brak dostępnych kolekcji do zmiany.</span>
                    )}
                </label>
                {userCollections.length > 0 && <Button onClick={handleSwitchCollection}>Zatwierdź zmianę kolekcji</Button>}
                <label className="flex gap-10">
                    Utwórz nową kolekcję:
                    <input className="bg-yellow-300" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} />
                    <Button onClick={handleCreateCollection}>Utwórz</Button>
                </label>
            </div>
        </div>
    );
};

export default SwitchCollection;
