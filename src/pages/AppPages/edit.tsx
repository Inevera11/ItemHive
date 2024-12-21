import React, { useState } from 'react';
import { useCollections } from '../../context/CollectionContext';
import { useUserSettings } from '../../context/UserSettingsContext';
import Button from '../../components/Button/Button';

const Edit = () => {
    const { currentCollectionName, currentUsername } = useUserSettings();
    const { getCollection, setCollection } = useCollections();
    const collection = getCollection(currentCollectionName);
    const [newUser, setNewUser] = useState<string>('');
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    const handleAddUser = () => {
        if (newUser.trim() === '' || collection?.whitelist.includes(newUser)) {
            setFeedbackMessage('Nazwa użytkownika musi być niepusta i nie może być dodana wielokrotnie');
            return;
        }
        const updatedCollection = {
            ...collection,
            whitelist: [...collection.whitelist, newUser]
        };
        setCollection(currentCollectionName, updatedCollection);
        setNewUser('');
        setFeedbackMessage('Użytkownik został dodany pomyślnie!');
    };

    const handleRemoveUser = (userToRemove: string) => {
        const updatedCollection = {
            ...collection,
            whitelist: collection.whitelist.filter(user => user !== userToRemove)
        };
        setCollection(currentCollectionName, updatedCollection);
        setFeedbackMessage('Użytkownik został usunięty pomyślnie!');
    };

    return (
        <div className="pt-10">
            <h1 className="text-center">Zarządzanie kolekcją: {currentCollectionName}</h1>
            {collection ? (
                <div className="grid grid-cols-3 pl-10 gap-4 grid-rows-8 ">
                    <p className="col-start-1">Uczestnicy:</p>
                    <div className="col-start-2">
                        {collection.whitelist.map((user) => (
                            <div key={user} className="flex justify-between items-center">
                                <p>{user}</p>
                                {user === currentUsername ? (
                                    <span>(Wy)</span>
                                ) : (
                                    <Button onClick={() => handleRemoveUser(user)}>Usuń</Button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="col-start-2">
                        <input 
                            className="bg-yellow-300" 
                            value={newUser} 
                            onChange={(e) => setNewUser(e.target.value)}
                            placeholder="Dodaj użytkownika"
                        />
                        <Button onClick={handleAddUser}>Dodaj</Button>
                    </div>
                    <p className="text-center col-start 3">{feedbackMessage}</p>
                </div>
            ) : (
                <p className="text-center text-gray-500">Nie wybrano kolekcji. Konieczne jest wybranie kolekcji, aby zarządzać uczestnikami.</p>
            )}
        </div>
    );
};

export default Edit;
