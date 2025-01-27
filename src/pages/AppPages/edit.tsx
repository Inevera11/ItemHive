import { useState } from 'react';
import Button from '../../components/Button/Button';
import useCollections from '../../context/useCollections';
import ConfirmationModal from '../../components/ConfirmationModal';
import ErrorModal from '../../components/ErrorModal';

const Edit = () => {
    const { getCollection, currentCollectionName, updateCollectionOthers } = useCollections();
    const [newUser, setNewUser] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userToRemove, setUserToRemove] = useState<string | null>(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const collection = getCollection();

    const handleAddUser = () => {
        if (!collection) {
            setErrorMessage('Wystąpił błąd. Spróbuj ponownie później');
            setErrorModalVisible(true);
            return;
        }
        if (newUser.trim() === '' || collection.others.includes(newUser)) {
            setErrorMessage('Nazwa użytkownika musi być unikalna i niepusta');
            setErrorModalVisible(true);
            return;
        }
        const newOthers = [...collection.others, newUser];
        updateCollectionOthers(newOthers);
        setNewUser('');
    };

    const handleRemoveUser = (userToRemove: string) => {
        setUserToRemove(userToRemove);
        setIsModalOpen(true);
    };

    const confirmRemoveUser = () => {
        if (!collection || !userToRemove) return;
        const newOthers = collection.others.filter((user) => user !== userToRemove);
        updateCollectionOthers(newOthers);
        setIsModalOpen(false);
        setUserToRemove(null);
    };

    const cancelRemoveUser = () => {
        setIsModalOpen(false);
        setUserToRemove(null);
    };

    const closeModal = () => {
        setErrorModalVisible(false);
        setErrorMessage('');
    };

    return (
        <div className="flex flex-col items-center">
            {collection ? (
                <div className="w-[80%] bg-white shadow-md rounded-lg p-8 mt-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Zarządzanie kolekcją: {currentCollectionName}</h1>
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
                                    <Button onClick={() => handleRemoveUser(user)} className="bg-red-400 text-black hover:bg-red-500 px-4 py-2 rounded-lg transition duration-200">Usuń</Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Dodaj użytkownika:</h2>
                        <div className="flex items-center gap-4">
                            <input className="border border-yellow-300 bg-yellow-200 focus:bg-yellow-100 rounded-lg px-3 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200" value={newUser} onChange={(e) => setNewUser(e.target.value)} placeholder="Dodaj użytkownika" />
                            <Button onClick={handleAddUser} className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 font-medium rounded-lg px-5 py-2.5 transition duration-200">Dodaj</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Nie wybrano kolekcji. Konieczne jest wybranie kolekcji, aby zarządzać uczestnikami.</p>
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                message={`Czy na pewno chcesz usunąć użytkownika ${userToRemove}?`}
                onConfirm={confirmRemoveUser}
                onCancel={cancelRemoveUser}
            />
            {errorModalVisible && (
                <ErrorModal errorName="Błąd" errorMessage={errorMessage} onClose={closeModal} />
            )}
        </div>
    );
};

export default Edit;
