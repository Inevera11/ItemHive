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
        <div className="flex flex-col items-center py-10 px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Zarządzanie kolekcją: {currentCollectionName}</h1>
            {collection ? (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Uczestnicy:</h2>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center px-3 py-2 rounded-md shadow-sm">
                                <span className="font-medium">{collection.owner}</span>
                                <span className="text-sm text-gray-500">Właściciel</span>
                            </li>
                            {collection.others.map((user) => (
                                <li key={user} className="flex justify-between items-center px-3 py-2 rounded-md shadow-sm">
                                    <span className="font-medium">{user}</span>
                                    <Button onClick={() => handleRemoveUser(user)} className="bg-red-400 text-white hover:bg-red-500 px-4 py-2 rounded-lg transition duration-200">Usuń</Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Dodaj użytkownika:</h2>
                        <div className="flex items-center gap-4">
                            <input className="border bg-yellow-200 focus:bg-yellow-200 px-3 py-2 w-full focus-outline-none focus-ring-2 focus:ring-yellow-400 transition duration-200" value={newUser} onChange={(e) => setNewUser(e.target.value)} placeholder="Dodaj użytkownika" />
                        <Button onClick={handleAddUser} className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 font-medium rounded-lg px-5 py-2.5 transition duration-200">Dodaj</Button>
                    </div>
                        <p className="mt-4 text-sm text-gray-600">{feedbackMessage}</p>
                </div>
            </div>
            ) : (
                <p className="text-center text-gray-500">Nie wybrano kolekcji. Konieczne jest wybranie kolekcji, aby zarządzać uczestnikami.</p>
            )}
        </div>
    );
};

export default Edit;
