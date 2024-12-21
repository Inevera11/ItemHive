import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import { useCollections } from '../context/CollectionContext';

const Index = () => {
    const { initCollections } = useCollections();

    return (
        <div className="h-screen flex flex-col items-center gap-10 pt-20">
            <h1>Witaj w ItemHive</h1>
            <Button onClick={initCollections}>
                <Link to="login">Mam już konto</Link>
            </Button>
            <Button onClick={initCollections}>
                <Link to="register">Chcę założyć konto</Link>
            </Button>
        </div>
    );
};

export default Index;
