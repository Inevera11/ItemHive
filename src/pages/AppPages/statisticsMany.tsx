import Chart from '../../components/Chart';

import { useState } from 'react';
import useCollections from '../../context/useCollections';

export const StatisticsMany = () => {
    const { getCollection } = useCollections();
    const collection = getCollection();
    const itemNames = collection ? collection.items.map((i) => i.name) : [];

    const [selectedItems, setSelectedItems] = useState<string[]>(itemNames);

    const handleItemChange = (itemName: string) => {
        setSelectedItems((prev) => (prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName]));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col items-center space-y-4 p-4">
                {itemNames.length > 0 ? (
                    <div>
                        <p className="text-center pt-10">Wybierz, które przedmioty wyświetlać:</p>
                        {itemNames.map((itemName) => (
                            <div key={itemName} className="flex items-center space-x-2">
                                <input type="checkbox" checked={selectedItems.includes(itemName)} onChange={() => handleItemChange(itemName)} className="mr-2" />
                                <label>{itemName}</label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Nie znaleziono kolekcji</p>
                )}
            </div>
            <div className="flex-grow flex items-center justify-center overflow-hidden p-4">
                <Chart itemNames={selectedItems} />
            </div>
        </div>
    );
};

export default StatisticsMany;
