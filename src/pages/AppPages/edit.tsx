import { useState } from 'react';
import Button from '../../components/Button/Button';
import useCollections from '../../context/useCollections';

const Edit = () => {
    const { getCollection, currentCollectionName, updateCollectionOthers } = useCollections();
    const [newUser, setNewUser] = useState<string>('');
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const collection = getCollection();

    const handleAddUser = () => {
        if (!collection) {
            setFeedbackMessage('Wystąpił błąd. Spróbuj ponownie później');
            return;
        }
        if (newUser.trim() === '' || collection.others.includes(newUser)) {
            setFeedbackMessage('Nazwa użytkownika musi być unikalna i nie pusta');
            return;
        }
        const newOthers = [...collection.others, newUser];
        updateCollectionOthers(newOthers);
        setNewUser('');
        setFeedbackMessage('Użytkownik został dodany pomyślnie!');
    };

    const handleRemoveUser = (userToRemove: string) => {
        if (!collection) {
            setFeedbackMessage('Wystąpił błąd. Spróbuj ponownie później');
            return;
        }
        const newOthers = collection.others.filter((user) => user !== userToRemove);
        updateCollectionOthers(newOthers);
        setFeedbackMessage('Użytkownik został usunięty pomyślnie!');
    };

    return (
        <div className="pt-10">
            <h1 className="text-center">Zarządzanie kolekcją: {currentCollectionName}</h1>
            {collection ? (
                <div className="grid grid-cols-3 pl-10 gap-4 grid-rows-8 ">
                    <p className="col-start-1">Uczestnicy:</p>
                    <div className="col-start-2">
                        <div className="flex justify-between items-center">
                            <p>{collection.owner}</p>
                            <p>Właściciel</p>
                        </div>
                        {collection.others.map((user) => (
                            <div key={user} className="flex justify-between items-center">
                                <p>{user}</p>
                                <Button onClick={() => handleRemoveUser(user)}>Usuń</Button>
                            </div>
                        ))}
                    </div>
                    <div className="col-start-2">
                        <input className="bg-yellow-300" value={newUser} onChange={(e) => setNewUser(e.target.value)} placeholder="Dodaj użytkownika" />
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
