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
        <div className="h-screen flex flex-col items-center gap-5 pt-20">
            <h1>Podaj swoje dane</h1>
            <label className="flex flex-col">
                Nazwa użytkownika
                <input className="bg-yellow-200" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="flex flex-col">
                Adres email
                <input className="bg-yellow-200" type="email" />
            </label>
            <label className="flex flex-col">
                Hasło
                <input className="bg-yellow-200" type="password" />
            </label>
            <Button onClick={handleRegister}>Potwierdź</Button>
        </div>
    );
};

export default Register;
