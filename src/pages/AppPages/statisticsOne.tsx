import { useParams } from 'react-router-dom';
import Chart from '../../components/Chart';
import { useUserSettings } from '../../context/UserSettingsContext';
import { useCollections } from '../../context/CollectionContext';
import { sanitizeForUrl } from '../../context/sanitizeForUrl';

export const StatisticsOne = () => {
    const { item } = useParams();

    const { currentCollectionName } = useUserSettings();
    const { getCollection } = useCollections();
    const collection = getCollection(currentCollectionName);
    const itemName = collection.items.find(i => sanitizeForUrl(i.name) === item).name;

    return (
        <div>
            <Chart collectionName={currentCollectionName} itemNames={[itemName]} />
        </div>
    );
};

export default StatisticsOne;