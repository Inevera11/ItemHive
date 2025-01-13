import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

const Index = () => {
    return (
        <div className="h-screen flex flex-col items-center gap-10 pt-20 bg-gradient-to-br from-yellow-100 to-yellow-200">
            <h1 className="text-4xl font-bold">
                Witaj w ItemHive
            </h1>
            <Button>
                <Link to="login"  className="block w-64 text-center py-4">Mam już konto</Link>
            </Button>
            <Button>
                <Link to="register" className="block w-64 text-center py-4">Chcę założyć konto</Link>
            </Button>
        </div>
    );
};

export default Index;
