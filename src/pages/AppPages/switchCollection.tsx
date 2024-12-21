import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import { useUserSettings } from '../../context/UserSettingsContext';
import { useCollections } from '../../context/CollectionContext';

const SwitchCollection = () => {
    const { currentCollectionName, setCurrentCollectionName, currentUsername } = useUserSettings();
    const { collections, addCollection } = useCollections();
    const [selectedCollection, setSelectedCollection] = useState<string>(currentCollectionName || '');
    const [newCollectionName, setNewCollectionName] = useState<string>('');
    useEffect(() => {
        setSelectedCollection(currentCollectionName);
    }, [currentCollectionName]);
    const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollection(event.target.value);
    };
    const handleSwitchCollection = () => {
        setCurrentCollectionName(selectedCollection);
    };
    const handleCreateCollection = () => {
        if (newCollectionName.trim() === '') {
            alert('Nazwa kolekcji musi być niepusta');
            return;
        }
        if (currentUsername.trim() === '') {
            alert('Nazwa użytkownika musi być niepusta');
            return;
        }
        addCollection(newCollectionName.trim(), currentUsername);
        setNewCollectionName('');
    };
    const filteredCollections = collections.filter(collection => 
        collection.whitelist.includes(currentUsername)
    );
    return (
        <div className="h-screen pt-10">
            <h1 className="text-center">
                {currentCollectionName 
                    ? `Aktualnie oglądasz kolekcję: ${currentCollectionName}` 
                    : "Aktualnie nie wybrano kolekcji"}
            </h1>
            <div className="flex items-end flex-col pr-[30%] gap-10 mt-10">
                <label className="flex gap-10">
                    Zmień aktualnie oglądaną kolekcję:
                    {filteredCollections.length > 0 ? (
                        <select 
                            className="bg-yellow-300" 
                            value={selectedCollection} 
                            onChange={handleCollectionChange}
                        >
                            <option value="" disabled>Select a collection</option>
                            {filteredCollections.map((collection) => (
                                <option key={collection.name} value={collection.name}>
                                    {collection.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span className="text-red-500">Brak dostępnych kolekcji do zmiany.</span>
                    )}
                </label>
                {filteredCollections.length > 0 && (
                    <Button onClick={handleSwitchCollection}>Zmień</Button>
                )}
                <label className="flex gap-10">
                    Utwórz nową kolekcję:
                    <input 
                        className="bg-yellow-300" 
                        value={newCollectionName} 
                        onChange={(e) => setNewCollectionName(e.target.value)}
                    />
                    <Button onClick={handleCreateCollection}>Utwórz</Button>
                </label>
            </div>
        </div>
    );
};

export default SwitchCollection;