import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCollections from '../../context/useCollections';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const { initCollections } = useCollections();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim() === '') {
            alert('Nieprawidłowa nazwa użytkownika');
            return;
        }
        initCollections(username);
        navigate('/app/main');
    };

    return (
        <div className="h-screen flex flex-col bg-yellow-100 items-center gap-5 pt-20">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 transform -translate-y-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Zaloguj się</h1>
            <label className="flex flex-col mb-4">
                Nazwa użytkownika
                <input className="bg-yellow-300" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="flex flex-col mb-6">
                Hasło
                <input className="bg-yellow-300" type="password" />
            </label>
            <div className="flex flex-col gap-4 items-center">
                <Button onClick={handleLogin}
                className={" w-64 py-2 px-4 rounded-lg"}>
                    Potwierdź
                </Button>
                <Button onClick={() => setShowPass(true)}
                className="w-64 text-blue-500 hover:underline text-center !bg-transparent">
                    Nie pamiętasz hasła?
                </Button>
            </div>
            {showPass ? (
                <div className="mt=6 flex flex-col items-start gap-4">
                    <p className="text-sm text-gray-700 leading-rekaxed">Na twój adres email zostanie wysłany link do zresetowania hasła
                    Postępuj dalej zgodnie z podanymi w nim informacjami.</p>
                    <label className="flex flex-col gap-1 w-full">
                        Adres email
                        <input className="bg-yellow-300 mb-6" />
                    </label>
                    <Button onClick={() => alert('Email został wysłany!')}>
                        <Link to="/">Potwierdź</Link>
                    </Button>
                </div>
            ) : (
                <></>
            )}
            </div>
        </div>
    );
};

export default Login;
