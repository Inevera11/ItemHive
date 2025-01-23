import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

const Index = () => {
    return (
        <div className="flex flex-col items-center h-screen gap-20 pt-20 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-100">
            <div className="flex flex-col items-center w-full max-w-lg bg-white rounded-lg shadow-lg p-8 relative z-10">
                <h1 className="text-4xl font-bold mb-8">
                    Witaj w ItemHive
                </h1>
                <img src="/logo.svg" className="mb-4" />
                <Button className="mb-4">
                    <Link to="login" className="block w-64 text-center p-2">Mam już konto</Link>
                </Button>
                <Button>
                    <Link to="register" className="block w-64 text-center p-2">Chcę założyć konto</Link>
                </Button>
            </div>
        </div>
    );
};

export default Index;
