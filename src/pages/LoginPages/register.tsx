import { useState } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import useCollections from '../../context/useCollections';

const Register = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { initCollections } = useCollections();

    const handleRegister = () => {
        if (username.trim() === '') {
            alert('Nieprawidłowa nazwa użytkownika');
            return;
        }
        initCollections(username);
        navigate('/app/main');
    };
    return (
        <div className="h-screen flex flex-col items-center gap-5 pt-20 bg-yellow-100">
            <div className="w-full max-w-md bg-white wounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-gray mb-4">Podaj swoje dane</h1>
                <label className="flex flex-col text-md font-medium text-gray-700 gap-3">
                    Nazwa użytkownika
                    <input className="bg-yellow-300 mb-4" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="flex flex-col text-md font-medium text-gray-700 gap-3">
                    Adres email
                    <input className="bg-yellow-300 mb-4" type="email" />
                </label>
                <label className="flex flex-col text-md font-medium text-gray-700 gap-3">
                    Hasło
                    <input className="bg-yellow-300 mb-8" type="password" />
                </label>
                <Button onClick={handleRegister}>Potwierdź</Button>
            </div>
        </div>
    );
};

export default Register;
