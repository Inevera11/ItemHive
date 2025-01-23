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
        <div className="flex flex-col items-center">
            <div className="w-[80%] bg-white shadow-md rounded-lg p-8 mt-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Statystyki dla przedmiotu {itemName}</h1>
                <Chart itemNames={[itemName]} />
            </div>
        </div>
    );
};

export default StatisticsOne;
