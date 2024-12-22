import { useParams } from 'react-router-dom';
import NewItem from '../../components/ItemForm';
import { v4 as uuidv4 } from 'uuid';
import useCollections from '../../context/useCollections';
import { SingleCollectionItem } from '../../context/types';

const EditItem = () => {
    const { item } = useParams<{ item: string }>();
    const { getCollection, loggedUser } = useCollections();

    const collection = getCollection();
    const initItem = (): SingleCollectionItem => {
        return {
            name: '',
            id: uuidv4(),
            url: '',
            updates: [{ timestamp: new Date().toISOString(), absoluteAmount: 0, user: loggedUser }],
        };
    };
    const existingItem: SingleCollectionItem = collection && item !== 'new' ? collection.items.find((el) => el.url === item) || initItem() : initItem();

    return (
        <div>
            <div className="flex flex-col items-center mt-10 text-lg">{item !== 'new' ? <p>Edycja przedmiotu {existingItem.name}</p> : <p>Dodawanie nowego przedmiotu</p>}</div>
            <NewItem existingItem={existingItem} />
        </div>
    );
};

export default EditItem;
