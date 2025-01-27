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
        <div className="flex flex-col items-center">
            <div className="w-[80%] bg-white shadow-md rounded-lg p-8 mt-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">{currentCollectionName ? `Aktualnie oglądasz kolekcję: ${currentCollectionName}` : 'Nie wybrano kolekcji'}</h1>
                <h2 className="text-lg font-semibold mb-6 text-center">
                    Zmień aktualnie oglądaną kolekcję:
                </h2>
                    {userCollections.length > 0 ? (
                        <div className="flex flex-col items-center gap-4">
                            <select className="border border-yellow-300 bg-yellow-200 focus:bg-yellow-100 rounded-lg px-3 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200" value={selectedCollection} onChange={handleCollectionChange}>
                                <option value="" disabled>
                                    Select a collection
                                </option>
                                {userCollections.map((collection) => (
                                    <option key={collection.name} value={collection.name}>
                                        {collection.name}
                                    </option>
                                ))}
                            </select>
                            <Button onClick={handleSwitchCollection} className="flex items-center gap-2"><i className="fas fa-check"></i>Zatwierdź zmianę kolekcji</Button>
                        </div>
                    ) : (
                        <p className="text-red-500 text-center">Brak dostępnych kolekcji do zmiany.</p>
                    )}
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-6 text-center">
                        Utwórz nową kolekcję:
                    </h2>
                    <div className="flex flex-col items-center gap-4">
                        <input className="border border-yellow-300 bg-yellow-200 focus:bg-yellow-100 rounded-lg px-3 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} />
                        <Button onClick={handleCreateCollection}>Utwórz</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwitchCollection;
