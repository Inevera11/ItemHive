import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CollectionTable from '../../components/CollectionTable/CollectionTable';

const Display = () => {
    return (
        <div>
            <CollectionTable />
            <Button>
                <Link to="../edit/UNKNOWN">Dodaj przedmiot</Link>
            </Button>
            <Button onClick={() => console.log('filtruję...')}>Filtruj</Button>
        </div>
    );
};

export default Display;
