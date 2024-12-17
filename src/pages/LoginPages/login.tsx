import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useState } from 'react';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="h-screen flex flex-col items-center gap-5 pt-20">
            <h1>Zaloguj się</h1>
            <label className="flex flex-col">
                Nazwa użytkownika
                <input className="bg-yellow-200" />
            </label>
            <label className="flex flex-col">
                Hasło
                <input className="bg-yellow-200" />
            </label>
            <div className="flex gap-10">
                <Button onClick={() => setShowPass(true)}>Zapomniałem/łam hasła</Button>
                <Button>
                    <Link to="/app/main">Potwierdź</Link>
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
