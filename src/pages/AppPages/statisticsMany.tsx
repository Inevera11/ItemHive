import Chart from '../../components/Chart';

import { useState } from 'react';
import useCollections from '../../context/useCollections';

export const StatisticsMany = () => {
    const { getCollection } = useCollections();
    const collection = getCollection();
    const itemNames = collection ? collection.items.map((i) => i.name) : [];

    const [selectedItems, setSelectedItems] = useState<string[]>(itemNames);

    return (
        <div className="flex flex-col items-center">
            <div className="w-[80%] bg-white shadow-md rounded-lg p-8 mt-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Statystyki dla wszystkich przedmiotów</h1>
                <Chart itemNames={selectedItems} />
            </div>
        </div>
    );
};

export default StatisticsMany;
