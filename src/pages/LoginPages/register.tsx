import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Register = () => {
    return (
        <div className="h-screen flex flex-col items-center gap-5 pt-20">
            <h1>Podaj swoje dane</h1>
            <label className="flex flex-col">
                Nazwa użytkownika
                <input className="bg-yellow-200" />
            </label>
            <label className="flex flex-col">
                Adres email
                <input className="bg-yellow-200" />
            </label>
            <label className="flex flex-col">
                Hasło
                <input className="bg-yellow-200" />
            </label>
            <Button>
                <Link to="/app/main">Potwierdź</Link>
            </Button>
        </div>
    );
};

export default Register;
