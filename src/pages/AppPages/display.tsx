import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CollectionTable from '../../components/CollectionTable/CollectionTable';
import { useCollections } from '../../context/CollectionContext';
import FilterModal from '../../components/FilterModal/FilterModal';
import { Item } from '../../context/CollectionContext';
import { useUserSettings } from '../../context/UserSettingsContext';

const Display = () => {
    const { currentCollectionName } = useUserSettings();
    const { getCollection } = useCollections();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [whitelist, setWhitelist] = useState<string[]>([]);

    useEffect(() => {
        if (currentCollectionName) {
            const collection = getCollection(currentCollectionName);
            if (collection) {
                setFilteredItems(collection.items);
                setWhitelist(collection.whitelist);
            }
        }
    }, [getCollection, currentCollectionName]);

    const handleApplyFilters = (filter1: string, filter2: string) => {
        const collection = getCollection(currentCollectionName);
        if (collection) {
            setFilteredItems(collection.items);
        }
        const filtered = filteredItems.filter(item => {
            const matchesFilter1 = filter1 ? item.updates.some(update => {
                const itemDate = new Date(update.timestamp);
                const filterDays = parseInt(filter1, 10);
                const today = new Date();
                // Dodajemy dni do obecnej daty, aby uzyskać datę "końcową"
                const targetDate = new Date(today.setDate(today.getDate() + filterDays));
                // Porównujemy daty, uwzględniając tylko daty (bez godzin)
                return itemDate.toDateString() === targetDate.toDateString();
            }) : true;
            // TODO czy to ma sens? sprawdzany jest dowolny użytkownik aktualizujący, nie tylko ostatni
            const matchesFilter2 = filter2 ? item.updates.some(update => update.user.includes(filter2)) : true;
            return matchesFilter1 && matchesFilter2;
        });
        setFilteredItems(filtered);
        setIsModalOpen(false);
    };

    return (
        <div className="mt-10 flex flex-col items-center">
            <div className="w-[80%] flex flex-col gap-10">
                {filteredItems.length > 0 ? (
                    <CollectionTable items={filteredItems} />
                ) : (
                    <div className="text-center text-gray-500">
                        <p>Brak przedmiotów do wyświetlenia.</p>
                        <p>Możecie spróbować zmienić filtry lub dodać nowe przedmioty.</p>
                    </div>
                )}
                <div className="self-end flex gap-10">
                    <Button>
                        <Link to="../edit/UNKNOWN">Dodaj przedmiot</Link>
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>Filtruj</Button>
                </div>
            </div>
            <FilterModal
                isOpen={isModalOpen}
                onApply={handleApplyFilters}
                whitelist={whitelist}
            />
        </div>
    );
};

export default Display;