import { useParams } from 'react-router-dom';
import NewItem from '../../components/ItemForm';
import { useCollections } from '../../context/CollectionContext';
import { useUserSettings } from '../../context/UserSettingsContext';
import { Item } from '../../context/CollectionContext';
import { sanitizeForUrl } from '../../context/sanitizeForUrl';

const EditItem = () => {
    const { item } = useParams<{ item: string }>();
    const { getCollection } = useCollections();
    const { currentCollectionName } = useUserSettings();

    const collection = getCollection(currentCollectionName);
    const existingItem: Item | undefined = collection?.items.find(i => sanitizeForUrl(i.name) === item);

    return (
        <div>
            <div className="flex flex-col items-center mt-10 text-lg">
                {existingItem ? (
                    <p>Edycja przedmiotu {existingItem.name}</p>
                ) : (
                    <p>Dodawanie nowego przedmiotu</p>
                )}
            </div>
            <NewItem existingItem={existingItem} />
        </div>
    );
};

export default EditItem;