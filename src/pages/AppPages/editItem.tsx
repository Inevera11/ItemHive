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
        <div className="flex flex-col items-center">
            <div className="w-2xl bg-white shadow-md rounded-lg p-8 mt-8">
                {item !== 'new' ? <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Edycja przedmiotu {existingItem.name}</h1> : <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Dodawanie nowego przedmiotu</h1>}
                <NewItem existingItem={existingItem} />
            </div>
        </div>
    );
};

export default EditItem;
