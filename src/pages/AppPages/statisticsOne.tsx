import { useParams } from 'react-router-dom';
import Chart from '../../components/Chart';
import useCollections from '../../context/useCollections';

export const StatisticsOne = () => {
    const { item } = useParams();

    const { getCollection } = useCollections();
    const collection = getCollection();
    if (!collection) return <></>;
    const itemName = collection.items.find((i) => i.url === item)?.name || '';

    return (
        <div>
            <Chart itemNames={[itemName]} />
        </div>
    );
};

export default StatisticsOne;
