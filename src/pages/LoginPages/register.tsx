import { useState } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import useCollections from '../../context/useCollections';
import ErrorModal from '../../components/ErrorModal';

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { initCollections } = useCollections();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        if (username.trim() === '') {
            setErrorMessage('Nieprawidłowa nazwa użytkownika');
            setErrorModalVisible(true);
            return;
        }
        initCollections(username);
        navigate('/app/main');
    };

    const closeModal = () => {
        setErrorModalVisible(false);
        setErrorMessage('');
    };

    const inputStyle = 'border border-yellow-300 bg-yellow-200 focus:bg-yellow-100 rounded-lg px-3 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200';

    return (
        <div className="h-screen flex flex-col items-center gap-5 pt-20 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-gray mb-4">Podaj swoje dane</h1>
                <label className="flex flex-col text-md font-medium text-gray-700 gap-3">
                    Nazwa użytkownika
                    <input className={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="flex flex-col text-md font-medium text-gray-700 gap-3">
                    Adres email
                    <input className={inputStyle} type="email" />
                </label>
                <label className="flex flex-col text-md font-medium text-gray-700 gap-3">
                    Hasło
                    <input className={inputStyle} type="password" />
                </label>
                <Button onClick={handleRegister}>Potwierdź</Button>
            </div>
            {errorModalVisible && (
                <ErrorModal errorName="Błąd" errorMessage={errorMessage} onClose={closeModal} />
            )}
        </div>
    );
};

export default Register;
