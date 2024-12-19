import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CollectionTable from '../../components/CollectionTable/CollectionTable';
import { useCollection } from '../../context/CollectionContext';

const Display = () => {
    const { items } = useCollection();
    return (
        <div className="mt-10 flex flex-col items-center">
            <div className="w-[80%] flex flex-col gap-10">
                <CollectionTable items={items} />
                <div className="self-end flex gap-10">
                    <Button>
                        <Link to="../edit/UNKNOWN">Dodaj przedmiot</Link>
                    </Button>
                    <Button onClick={() => console.log('filtruję...')}>Filtruj</Button>
                </div>
            </div>
        </div>
    );
};

export default Display;
