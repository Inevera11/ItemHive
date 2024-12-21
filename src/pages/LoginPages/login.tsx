import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';
import { useCollections } from '../../context/CollectionContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const { setCurrentUsername, setCurrentCollectionName } = useUserSettings();
    const { collections } = useCollections();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim() === '') {
            alert('Nazwa użytkownika musi być niepusta');
            return;
        }
        setCurrentUsername(username);
        const currentCollection = collections.find(collection => 
            collection.whitelist.includes(username)
        );
        if (currentCollection) {
            setCurrentCollectionName(currentCollection.name);
        } else {
            setCurrentCollectionName(false);
        }
        navigate('/app/main');
    };

    return (
        <div className="h-screen flex flex-col items-center gap-5 pt-20">
            <h1>Zaloguj się</h1>
            <label className="flex flex-col">
                Nazwa użytkownika
                <input 
                    className="bg-yellow-200" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label className="flex flex-col">
                Hasło
                <input className="bg-yellow-200" type="password"/>
            </label>
            <div className="flex gap-10">
                <Button onClick={() => setShowPass(true)}>Zapomniałem/łam hasła</Button>
                <Button onClick={handleLogin}>
                    Potwierdź
                </Button>
            </div>
            {showPass ? (
                <div>
                    <p>Na twój adres email zostanie wysłany link do zresetowania hasła</p>
                    <p>Postępuj dalej zgodnie z podanymi w nim informacjami.</p>
                    <label className="flex flex-col">
                        Email
                        <input className="bg-yellow-200" />
                    </label>
                    <Button onClick={() => alert('Email został wysłany!')}>
                        <Link to="/">Potwierdź</Link>
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Login;