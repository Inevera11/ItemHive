import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCollections from '../../context/useCollections';
import ErrorModal from '../../components/ErrorModal';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const { initCollections } = useCollections();
    const navigate = useNavigate();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorName, setErrorName] = useState('Błąd');

    const handleLogin = () => {
        if (username.trim() === '') {
            setErrorName('Błąd');
            setErrorMessage('Nieprawidłowa nazwa użytkownika');
            setErrorModalVisible(true);
            return;
        }
        initCollections(username);
        navigate('/app/main');
    };

    const handleSendEmail = () => {
        if (email.trim() === '') {
            setErrorName('Błąd');
            setErrorMessage('Proszę podać adres email');
            setErrorModalVisible(true);
            return;
        }
        setErrorName('Potwierdzenie');
        setErrorMessage('Email z instrukcjami odzyskiwania został wysłany na podany adres!');
        setErrorModalVisible(true);
    };

    const closeModal = () => {
        setErrorModalVisible(false);
        setErrorMessage('');
        setErrorName('Błąd');
        setEmail('');
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-100 items-center gap-5 pt-20">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 transform -translate-y-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Zaloguj się</h1>
                <label className="flex flex-col mb-4">
                    Nazwa użytkownika
                    <input className="bg-yellow-300 rounded-lg p-2" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="flex flex-col mb-6">
                    Hasło
                    <input className="bg-yellow-300 rounded-lg p-2" type="password" />
                </label>
                <div className="flex flex-col gap-4 items-center">
                    <Button onClick={handleLogin} className={"w-64 py-2 px-4 rounded-lg p-2"}>
                        Potwierdź
                    </Button>
                    <Button onClick={() => setShowPass(true)} className="w-64 text-blue-500 hover:underline text-center !bg-transparent">
                        Nie pamiętasz hasła?
                    </Button>
                </div>
                {showPass ? (
                    <div className="mt=6 flex flex-col items-start gap-4">
                        <p className="text-sm text-gray-700 leading-rekaxed">Na twój adres email zostanie wysłany link do zresetowania hasła.
                        Postępuj dalej zgodnie z podanymi w nim informacjami.</p>
                        <label className="flex flex-col gap-1 w-full">
                            Adres email
                            <input 
                                className="bg-yellow-300 mb-6 rounded-lg p-2" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <Button onClick={handleSendEmail}>
                            Potwierdź
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {errorModalVisible && (
                <ErrorModal errorName={errorName} errorMessage={errorMessage} onClose={closeModal} />
            )}
        </div>
    );
};

export default Login;
