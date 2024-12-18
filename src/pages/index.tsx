import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import { useCollection } from '../context/CollectionContext';

const Index = () => {
    const { initItems } = useCollection();

    return (
        <div className="h-screen flex flex-col items-center gap-10 pt-20">
            <h1>Witaj w ItemHive</h1>
            <Button onClick={initItems}>
                <Link to="login">Mam już konto</Link>
            </Button>
            <Button onClick={initItems}>
                <Link to="register">Chcę założyć konto</Link>
            </Button>
        </div>
    );
};

export default Index;
