import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CollectionTable from '../../components/CollectionTable/CollectionTable';
import FilterModal from '../../components/FilterModal/FilterModal';
import useCollections from '../../context/useCollections';
import { SingleCollectionItem } from '../../context/types';

const Display = () => {
    const { getCollection } = useCollections();

    const initFilteredItems = () => {
        const currCollection = getCollection();
        return currCollection ? currCollection.items : [];
    };

    const getWhiteList = () => {
        const currCollection = getCollection();
        return currCollection ? currCollection.others : [];
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState<SingleCollectionItem[]>(initFilteredItems());

    const handleApplyFilters = (filter1: string, filter2: string) => {
        const filtered = initFilteredItems().filter((item) => {
            const matchesFilter1 = filter1
                ? item.updates.some((update) => {
                      const itemDate = new Date(update.timestamp);
                      const filterDays = parseInt(filter1, 10);
                      const today = new Date();
                      // Dodajemy dni do obecnej daty, aby uzyskać datę "końcową"
                      const targetDate = new Date(today.setDate(today.getDate() + filterDays));
                      // Porównujemy daty, uwzględniając tylko daty (bez godzin)
                      return itemDate.toDateString() === targetDate.toDateString();
                  })
                : true;
            // TODO czy to ma sens? sprawdzany jest dowolny użytkownik aktualizujący, nie tylko ostatni
            const matchesFilter2 = filter2 ? item.updates.some((update) => update.user.includes(filter2)) : true;
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
                        <p>Dostosuj użyte filtry lub dodaj nowe przedmioty.</p>
                    </div>
                )}
                <div className="self-end flex gap-4 mt-6">
                    <Button>
                        <Link to="../edit/new">
                            <i className="fas fa-plus mr-2"></i>
                            Dodaj przedmiot
                        </Link>
                    </Button>
                    <Button
                        onClick={() => {
                            setFilteredItems(initFilteredItems());
                        }}>
                        <i className="fas fa-broom mr-2"></i>
                        Wyczyść filtry
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <i className="fas fa-filter mr-2"></i>
                        Filtruj
                    </Button>
                </div>
            </div>
            <FilterModal isOpen={isModalOpen} onApply={handleApplyFilters} whitelist={getWhiteList()} />
        </div>
    );
};

export default Display;
